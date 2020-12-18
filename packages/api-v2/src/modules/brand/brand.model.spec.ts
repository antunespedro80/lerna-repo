import { Brand } from './brand.model';

describe('BrandModel', () => {
    it('should be defined', () => {
        expect(new Brand()).toBeDefined();
    });
});
