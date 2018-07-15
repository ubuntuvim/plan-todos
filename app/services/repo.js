import Service from '@ember/service';
import Evented from '@ember/object/evented';

const fs = requireNode('fs-extra');
const { ipcRenderer } = requireNode('electron');

export default Service.extend(Evented, {
  lastId: 0,
  data: [],
  findAll() {
    let data = this.get('data');
    if (data && data.length > 0) {
      return data;
    } else {
      // 读取本地文件初始化数据
      this.readJsonFile();
      return this.get('data');  // 初始化完成后再返回
    }
  },

  add(attrs) {
    // 创建的是普通JS对象，并不是Emberjs对象
    let todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);
    this.log("新增todo: " + todo);
    this.get('data').pushObject(todo);
    this.persist();
    return todo;
  },

  delete(todo) {
    this.log("删除数据：" + todo);
    this.get('data').removeObject(todo);
    this.persist();
  },

  /**
   * 持久化数据到本地json文件中
   */
  async persist() {
    // 消息会同步发送到electron主线程中处理 ember-electron/main.js
    ipcRenderer.send('todos-data', JSON.stringify(this.get('data')));
    this.log("web数据写入完毕。。。");
  },

  /**
   * 读取json文件
   */
  readJsonFile() {
    try {
      let objArr = ipcRenderer.sendSync('synchronous-message', '同步发请求获取数据');
      this.log('service:repo objArr = ' + objArr);
      if (objArr) {
        let objs = JSON.parse(objArr);
        this.log('service:repo objs = ' + objs);
        for (var i = 0; i < objs.length; i++) {
          this.get('data').pushObject(objs[i]);
        }
      }
     this.log('数据加载完毕...');
    } catch (err) {
      console.error("数据加载失败：" + err);
    }
  },

  log(msg) {
    console.log(msg);
  }
});
