

export default {
  state: {
    access: '',

  },
  mutations: {
    setAccess(state, access) {
      state.access = access
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
  },
  getters: {

  },
  actions: {
     getUserPerms ({ state, commit }) {
        return  new Promise(async (resolve, reject) => {
            try {
                let res = await $ajax('webmenuperms', 'get', {})
                if(!res) return false
                console.log(res)
                let access = []
                let f_values = res.f_data_json.f_values
                Object.keys(f_values).forEach(key => {
                    access.push(key)
                })
                console.log(access)
                commit('setAccess', access)
                resolve(res)
            }catch (err){
                reject(err)
            }
        })
    }
  }
}
