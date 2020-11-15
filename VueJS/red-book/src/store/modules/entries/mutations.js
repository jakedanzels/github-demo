export default {
    setAllEntries(state,payload){
        state.allEntries = payload;
    },
    randomEntryHintSeen(state){
        state.randomEntryHintSeen = true;
    }
}