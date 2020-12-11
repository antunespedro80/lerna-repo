import { Country } from './country.model';

describe('Country', () => {
    it('should be defined', () => {
        expect(new Country()).toBeDefined();
    });
});
