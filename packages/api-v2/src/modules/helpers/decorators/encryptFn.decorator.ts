import { DecoratorHelper } from '../decorator.helper';

/**
 * Function used to encrypt when returning response
 * @param value
 */
const EncryptFnDecorator = (
    value: any,
    //obj: any,
    //transformationType: TransformationType,
) => {
    if (value !== null && value !== undefined) {
        const service = DecoratorHelper.getEncryptHelper();
        return service.encrypt(String(value));
    } else {
        return value;
    }
};

export { EncryptFnDecorator };
