import { helper } from '@ember/component/helper';

export default helper(function([count]) {
  return count === 1 ? "item" : "items";
});
