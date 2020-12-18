import { Person } from './person.model';

describe('PersonModel', () => {
    it('should be defined', () => {
        expect(new Person()).toBeDefined();
    });
});
