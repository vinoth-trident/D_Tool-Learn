export default class Validator {
  static readonly password = (value: any) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/?.test(value);
  };
 
  static readonly email = (value: any) => {
    return !!/^\w+[+\\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(
      value
    );
  };

}
