<template>
  <div class="left">
    <div class="mean">{{ active.mean }}</div>
    <div class="number">
      <span
        v-for="it in Yi"
        @click="onToggle(it)"
        :key="it"
        :class="{
          up: it.value === 1,
          center: it.value === 2,
          active: it.index === active.index,
          animation: it.index === active.index,
        }"
        >{{ it.index }}</span
      >
    </div>
    <div class="compute">
      计算：
      <input type="text" placeholder="请输入手机号" v-model="testNumber" />
      <span v-show="testResult"> 结果：{{ testResult }} </span>
    </div>

    <div class="buy">
      <span
        v-for="it in BUY"
        @click="onSee(it.phone)"
        :key="it.active"
        :class="{
          active: it.active,
        }"
      >
        <label>{{ it.phone }}</label
        >{{ it.price }}
      </span>
    </div>
  </div>

  <div class="right">
    <div class="filter">
      查询:
      <input type="text" v-model="search[0]" disabled />
      <input type="text" v-model="search[1]" />
      <input type="text" v-model="search[2]" />
      <input type="text" v-model="search[3]" />
      <input type="text" v-model="search[4]" />
      <input type="text" v-model="search[5]" />
      <input type="text" v-model="search[6]" />
      <input type="text" v-model="search[7]" />
      <input type="text" v-model="search[8]" />
      <input type="text" v-model="search[9]" />
      <input type="text" v-model="search[10]" />
      <button @click="onSearch">搜 索</button>
      {{ searchValue }}
    </div>

    <div class="phone">
      <span
        v-for="it in phone"
        :key="it"
        :class="{
          up: it.value === 1,
          center: it.value === 2,
          down: it.value === 3,
        }"
      >
        <i>{{ getLevel(it.value) }}</i>
        <label>{{ it.phone }}</label>
        <em>{{ it.total }}</em>
        <small>￥{{ it.price }}</small>
      </span>
    </div>
  </div>
</template>

<script>
import BUY from "./util/buy";
import { searchPhone, Yi } from "./util";
import { reactive, ref, computed } from "vue";
const SHU_TYPE = {
  1: "上",
  2: "中",
  3: "下",
};
export default {
  name: "app",
  setup() {
    let active = ref({});
    let search = reactive([1, 3, 6, 0, "", "", "", "", "", "", "", ""]);
    let phone = ref([]);
    let testNumber = ref("");

    const searchValue = computed(() => {
      const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11] = search;
      let value = "";
      value += p1 || "_";
      value += p2 || "_";
      value += p3 || "_";
      value += p4 || "_";
      value += p5 || "_";
      value += p6 || "_";
      value += p7 || "_";
      value += p8 || "_";
      value += p9 || "_";
      value += p10 || "_";
      value += p11 || "_";
      return value;
    });

    const onSearch = async () => {
      try {
        const res = await searchPhone(searchValue.value);
        phone.value = res;
      } catch {}
    };
    const getLevel = (value) => SHU_TYPE[value];
    const onToggle = (value) => (active.value = value);
    const onSee = value => testNumber.value = value;
    return {
      Yi,
      BUY,
      testNumber,
      active,
      phone,
      search,
      searchValue,
      onSee,
      onSearch,
      getLevel,
      onToggle,
      testResult: computed(() => {
        let sum = 0;
        for (let i of String(testNumber.value)) {
          sum += Number(i);
        }
        const find = Yi.find((it) => it.index === sum);
        if (find) active.value = find;
        return sum;
      }),
     
    };
  },
};
</script>

