import { Gender } from './gender.model';

describe('Gender', () => {
    it('should be defined', () => {
        expect(new Gender()).toBeDefined();
    });
});
