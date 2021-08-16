// !工具方法 

const LOCAL_KEY = "todomvc" //!保存到localstorage中的键值对键名

// 生成一个唯一的任务id 时间戳+4位随机数 便于v-for
export function generateId() {
    return Date.now() + Math.random().toString(16).substr(2, 4)
}
// 从localstorage获取目前所有任务 键名为LOCAL_KEY的键值
export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY)
    if (result) {
        return JSON.parse(result)
    }
    return []
}

// 保存所有任务到localstorage中   給键名为LOCAL_KEY的键值对保存一个键值
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

// 根据条件筛选出当前需要显示的任务
export function filter(todos, fliterCondition = "all") {
    if (fliterCondition === "all") {
        return todos
    }
    else if (fliterCondition === "active") {
        return todos.filter((todo) => !todo.completed)
    }
    else if (fliterCondition === "completed") {
        return todos.filter((todo) => todo.completed)
    }
    else {
        throw new Error("invalid visibility value");
    }
}

