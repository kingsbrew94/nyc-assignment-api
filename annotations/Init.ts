/**
 * @author Kingsley Baah Brew <kingsleybrew@gmail.com>
 * @param target | any
 * @param propertyKey | any
 * @todo This decorator automatically assigns a variable typed object to its object
 *       For example instead of  testClass: TestClass = new TestClass();
 *       Autowired takes care of that automatically so in that case it will be
 *       @Autowired
 *       testClass!: TestClass;
 */
export default function Init(target: any, propertyKey: any) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    target[propertyKey] = new type();
}