import { validateCandidateData } from './validator';

describe('validateCandidateData', () => {
    it('accepts minimal valid candidate data', () => {
        expect(() =>
            validateCandidateData({
                firstName: 'María',
                lastName: 'Pérez',
                email: 'maria@example.com',
            }),
        ).not.toThrow();
    });

    it('throws on invalid email', () => {
        expect(() =>
            validateCandidateData({
                firstName: 'María',
                lastName: 'Pérez',
                email: 'not-an-email',
            }),
        ).toThrow('Invalid email');
    });
});
