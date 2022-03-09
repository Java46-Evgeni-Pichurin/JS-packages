export default class NavigatorButtons {
    #arrayOfId
    constructor(arrayOfId){
        this.#arrayOfId = arrayOfId;
    }
    setActive(index){
        const a = "btn btn-outline-primary col-sm-2";
        return document.querySelector(`#${this.#arrayOfId[index]}`).setAttribute("class", a + " active");
    }
    setInActiveAll(){
        const a = "btn btn-outline-primary col-sm-2";
        return this.#arrayOfId.forEach(id => document.querySelector(`#${id}`).setAttribute("class", a));
    }
}