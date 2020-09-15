



export default {
    state: {
        f_type: false,
        f_aad_direction: false,
    },
    mutations: {
        changeFType (state, payload) {
            console.log(payload)
            state.f_type = payload.f_type
            state.f_aad_direction = payload.f_aad_direction
        },
      
    },
    getters: {

    },
    actions: {

    }
}