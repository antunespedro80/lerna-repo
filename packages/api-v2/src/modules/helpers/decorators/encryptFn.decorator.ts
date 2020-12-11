import { TransformationType } from 'class-transformer';
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
    const service = DecoratorHelper.getEncryptHelper();
    return service.encrypt(String(value));
};

export default EncryptFnDecorator;
