import { Category } from './category.model';

describe('CategoryModel', () => {
    it('should be defined', () => {
        expect(new Category()).toBeDefined();
    });
});
