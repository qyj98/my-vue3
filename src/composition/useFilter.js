// !任务筛选模块  data：当前要显示的任务 []
import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../utills/todoStorage";
// !根据地址栏hash值筛选对应显示的任务
const validHash = ["all", "active", "completed"] //正确的hash
export default function useFilter(todoRef) {
    const visibleRef = ref("all") //! 当前要显示的任务 初始为all (data)
    const onHashChange = () => {  //! method/computed
        const hash = location.hash.replace(/#\/?/, "")
        // console.log(hash);
        if (validHash.includes(hash)) {
            // 当前哈希在有效哈希列表中 当前显示任务为hash值
            visibleRef.value = hash
        } else {
            // 当前hash值无效 把hash值清空，当前显示任务为all
            location.hash = "";
            visibleRef.value = "all"
            // console.log(hash);
        }
    }

    // ! 声明周期函数，已挂载 和 已销毁 监听hash值的改变 判断哈希值是否为可用hash 可用就把data赋值为hash  不可用就把data赋值为all
    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)

    })

    // 根据条件筛选出当前需要显示的任务
    const todosFilter = computed(() => {
        return filter(todoRef.value, visibleRef.value,)
    })

    // 筛选出当前正在进行中的任务
    const leftTodos = computed(() => {
        return filter(todoRef.value, "active").length
    })
   

    return {
        visibleRef,
        todosFilter,
        leftTodos,
    }
}