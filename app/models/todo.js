import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  stats: attr('number'), // todo的状态：0-新建；1-完成；3-删除
  urgent: attr('string'), //紧急程度：蓝色-普通；橙色-急；红色-紧急
  createDate: attr('number')  //创建时间，时间戳格式
});
