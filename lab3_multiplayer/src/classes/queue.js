export default class Queue {
  constructor(data) {
      this.items = {}
      if(data.length){
        for (let i = 0; i < data.length; i++) {
            this.items[i] = data[i]
        }
        this.backIndex = data.length
      }else{
        this.backIndex = 0
      }
      this.frontIndex = 0
  }
  enqueue(item) {
      this.items[this.backIndex] = item
      this.backIndex++
      return item + ' inserted'
  }
  dequeue() {
      const item = this.items[this.frontIndex]
      delete this.items[this.frontIndex]
      this.frontIndex++
      return item
  }
  peek() {
      return this.items[this.frontIndex]
  }
  get printQueue() {
      return this.items;
  }

  get printKeys(){
    if(this.backIndex === 0){
      return []
    }
    return Object.keys(this.items).map(key => this.items[key]);
  }
  
  clone() {
    const newQueue = new Queue([]);
    newQueue.items = { ...this.items };
    newQueue.frontIndex = this.frontIndex;
    newQueue.backIndex = this.backIndex;
    return newQueue;
  }
}