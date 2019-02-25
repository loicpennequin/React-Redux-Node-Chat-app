module.exports = async function wrap(fn){
    try{
        fn();
    }catch(error){
        return { error };
    }
}
