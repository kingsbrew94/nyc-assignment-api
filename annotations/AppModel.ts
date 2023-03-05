/**
 * @author K.B.Brew
 * @param object | any
 * @todo This decorator invokes the host class constructor and initiates Models
 *       the express js object and application object as an argument to the host class constructor
 */
function AppModel<T extends { new(...args:any[]):{} }>(constructor:T) {
    const original = class extends constructor {

      constructor(...args: any) {
        super(...args);
        console.log(`Migrating ${constructor.name} ....`);
      }
    }
    new original();
}
export default AppModel;
  