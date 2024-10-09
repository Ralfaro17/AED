export default class Queue {

  constructor(data) {
    this.items = {}
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        this.items[i] = data[i]
      }
      this.backIndex = data.length
    } else {
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
    console.log(this.frontIndex, this.backIndex - 1)
    const item = this.items[this.frontIndex]
    delete this.items[this.frontIndex]
    this.frontIndex++
    if (this.frontIndex === this.backIndex) {
      this.frontIndex = 0
      this.backIndex = 0
      this.items = {}
      return false;
    }
    return item
  }

  peek() {
    return this.items[this.frontIndex]
  }

  clone() {
    const newQueue = new Queue([]);
    newQueue.items = { ...this.items };
    newQueue.frontIndex = this.frontIndex;
    newQueue.backIndex = this.backIndex;
    return newQueue;
  }

  stackItem(item) {
    let first = this.items[this.frontIndex];
    let temp = this.items[this.frontIndex + 1]
    for (let i = this.frontIndex; i < this.backIndex + 1; i++) {
      if (i === this.frontIndex) {
        this.items[i] = item;
      }
      else if (i === this.frontIndex + 1) {
        this.items[i] = first;
      }
      else {
        if (temp === null || temp === undefined)
          break
        this.items[i] = temp;
        temp = this.items[i + 1];
      }
    }
    this.backIndex++;
    return item + ' inserted';
  }

  deleteLast() {
    if (this.backIndex === 0) {
      return false;
    }
    const item = this.items[this.backIndex - 1];
    delete this.items[this.backIndex - 1];
    if (this.backIndex > 0)
      this.backIndex--;
    return item;
  }

  get printQueue() {
    return this.items;
  }

  get printKeys() {
    if (this.backIndex === 0) {
      return []
    }
    return Object.keys(this.items).map(key => this.items[key]);
  }

}