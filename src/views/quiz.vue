<template>
  <div class="quiz">
    <div class="quiz-wrapper">
      <div class="title">{{ actions.quizIndex+1 +"、"+ ourQuizs[actions.quizIndex].question }}</div>
      <div class="option">
          <a-radio-group v-model:value="ourQuizs[actions.quizIndex].yourAnswer">
            <a-radio 
              :style="radioStyle" 
              :value="item.value" 
              v-for="item in ourQuizs[actions.quizIndex].options"
              :key="item.id"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
      </div>
      <div class="direction">
        <a-button type="primary" class="prev" :disabled="!actions.quizIndex" @click="actions.prevFn">Prev</a-button>
        <a-button type="primary" class="next" :disabled="actions.quizIndex==11" @click="actions.nextFn">Next</a-button>
        <a-button type="primary" class="result" v-if="actions.quizIndex==11" @click="actions.showResult" :loading="actions.loading">{{actions.loading?"calculating...":"Result"}}</a-button>
      </div>
    </div>
  </div>
  <a-modal v-model:open="model.visible" class="answer-model" title="Result" width="700px" ok-text="Confirm" cancel-text="Close" @cancel="model.hideModal" @ok="model.hideModal">
    <div class="model-answer">
    There are a total of <b>{{ result.total }}</b>
    questions, you answered <b>{{ result.corrent }}</b> 
    of them correctly with an accuracy rate of <b>{{(result.corrent*100/result.total).toFixed(0)}}%</b>.</div>
    <div class="model-lists">
      <div class="model-list" v-for="item in result.lists" :key="item.type">
        For {{item.name}} scam types: <b>{{ item.total }}</b> questions in total, <b>{{ item.correctTotal }}</b> answered correctly. </div>
    </div>
    <div class="model-conclusion">
      <b>Conclusion: </b>
      <span v-if="result.lists.filter(item=>!item.isGood).map(item=>item.name).length">You made more mistakes in the <span class="danger">{{result.lists.filter(item=>!item.isGood).map(item=>item.name).join(" and ")}}</span> scam category, It's recommended that you study more about this topic </span>
      <span v-if="result.lists.filter(item=>!item.isGood).map(item=>item.name).length&&result.lists.filter(item=>item.isGood).map(item=>item.name).length">,</span>
      <span v-if="result.lists.filter(item=>item.isGood).map(item=>item.name).length">You performed perfectly in the <span class="success">{{result.lists.filter(item=>item.isGood).map(item=>item.name).join(" and ")}}</span> categories, please keep it up.</span>
    </div>
  </a-modal>
</template>
<script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { quizs, getRandomElementsFromArray } from "../utils/index"
  import { message } from 'ant-design-vue';
  import axios from "axios";
  const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
  });
  const types = [3, 3, 3, 3];
  const max = types.reduce((prev,next)=>prev+next);
  const typeMaps = ["Email", "Phishing", "SMS", "Elder"];
  const ourQuizs = ref([{}]);
  const result = reactive({
    lists: [],
    total: max,
    corrent: 0,
  });

  const actions = reactive({
    loading:false,
    quizIndex:0,
    prevFn:()=>{
      actions.quizIndex--;
      if(actions.quizIndex===ourQuizs.length){
        return;
      }
    },
    nextFn:()=>{
      const yourAnswer = ourQuizs.value[actions.quizIndex].yourAnswer;
      if(!yourAnswer){
        message.warning('Please select the answer!');
        return;
      }
      actions.quizIndex++;
      if(actions.quizIndex===0){
        return;
      }
    },
    showResult:()=>{
      const yourAnswer = ourQuizs.value[actions.quizIndex].yourAnswer;
      if(!yourAnswer){
        message.warning('Please select the answer!');
        return;
      }
      result.corrent = 0
      result.lists = types.map((item,index)=>{
        result.corrent += ourQuizs.value.filter(item=>item.type==(index+1)).filter(item=>item.correct==item.yourAnswer).length
        return {
          type:index+1,
          name:typeMaps[index],
          total: item,
          correctTotal: ourQuizs.value.filter(item=>item.type==(index+1)).filter(item=>item.correct==item.yourAnswer).length,
          isGood:item == ourQuizs.value.filter(item=>item.type==(index+1)).filter(item=>item.correct==item.yourAnswer).length
        }
      })
      actions.loading=true
      setTimeout(()=>{
        model.showModal()
        actions.loading=false
      },2000)
    }
  });
  const model = reactive({
    visible:false,
    showModal:()=>{
      model.visible = true;
    },
    hideModal:()=>{
      model.visible = false;
      result.lists = [];
      result.total = max;
      result.corrent = 0;
      actions.quizIndex = 0;
      ourQuizs.value.forEach(item=>{
        item.yourAnswer = ""
      })
    }
  })

  // types.forEach((type, index)=>{
  //   const myTypeItem = quizs.filter(item=>item.type==(index+1))
  //   const selects = getRandomElementsFromArray(myTypeItem, type)
  //   ourQuizs.value.push(...selects);
  // })
  // ourQuizs.value.sort((a,b)=>{
  //   return a.id-b.id
  // })
  onMounted(() => {
    axios.get('/api/quiz/getquizpool')
    .then(function (response) {
      console.log(response.data);
      if(response.data.code==200){
        const lists=response.data.data
        lists.forEach(item=>{
          item.yourAnswer="";
          console.log(item.id);
          item.options = JSON.parse(item.options);
        })
        ourQuizs.value = []
        types.forEach((type, index)=>{
          const myTypeItem = lists.filter(item=>item.type==(index+1))
          const selects = getRandomElementsFromArray(myTypeItem, type)
          ourQuizs.value.push(...selects);
        })
        ourQuizs.value.sort((a,b)=>{
          return a.id-b.id
        })
        console.log(ourQuizs.value);
      }else{
        ourQuizs.value=[]
      }
    })
  })
</script>
<style scoped>
  .quiz-wrapper{
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin:0 auto;
  }
  .title{
    margin-top: 100px;
    font-size: 24px;
    line-height: 36px;
  }
  .option {
    margin-top: 20px;
    align-self: flex-start;
  }
  .direction{
    margin-top: 50px;
  }
  .direction .next{
    margin-left: 20px;
  }
  .direction .result{
    margin-left: 20px;
  }
  /* .answer-model .ant-modal-title{
    font-size: 28px;
    font-weight: 600;
    color: #222C28;
  }
   */
  .model-answer{
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 8px;
    color: #222C28;
  }
  .model-lists .model-list{
    line-height: 28px;
    color: #222C28;
    font-size: 14px;
  }
  .model-conclusion{
    margin-top: 12px;
    line-height: 28px;
    color: #222C28;
    font-size: 16px;
  }
  .model-conclusion .success{
    color: #20A675;
  }
  .model-conclusion .danger{
    color: #ff4d4f;
  }
</style>