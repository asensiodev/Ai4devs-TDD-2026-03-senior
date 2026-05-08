import { validateCandidateData } from '../application/validator';

jest.mock('@prisma/client', () => {
    const actual = jest.requireActual('@prisma/client');
    const prismaMock = {
        candidate: {
            create: jest.fn(),
            update: jest.fn(),
            findUnique: jest.fn(),
        },
        education: {
            create: jest.fn(),
            update: jest.fn(),
        },
        workExperience: {
            create: jest.fn(),
            update: jest.fn(),
        },
        resume: {
            create: jest.fn(),
        },
    };
    return {
        ...actual,
        PrismaClient: jest.fn(() => prismaMock),
    };
});

import { addCandidate } from '../application/services/candidateService';

describe('Recepción de datos del formulario (validación antes de persistir)', () => {
    it('rechaza un email con formato inválido', () => {
        expect(() =>
            validateCandidateData({
                firstName: 'Laura',
                lastName: 'García',
                email: 'no-es-un-email',
            }),
        ).toThrow('Invalid email');
    });

    it('acepta un payload mínimo coherente con el formulario de alta', () => {
        expect(() =>
            validateCandidateData({
                firstName: 'Laura',
                lastName: 'García',
                email: 'laura@example.com',
            }),
        ).not.toThrow();
    });
});

describe('Guardado en base de datos (servicio de alta de candidato)', () => {
    let prismaMock: {
        candidate: { create: jest.Mock };
        education: { create: jest.Mock };
        workExperience: { create: jest.Mock };
        resume: { create: jest.Mock };
    };

    beforeEach(() => {
        jest.clearAllMocks();
        const { PrismaClient } = jest.requireMock<{ PrismaClient: new () => typeof prismaMock }>(
            '@prisma/client',
        );
        prismaMock = new PrismaClient();
        prismaMock.candidate.create.mockResolvedValue({
            id: 42,
            firstName: 'Laura',
            lastName: 'García',
            email: 'laura@example.com',
            phone: null,
            address: null,
        });
    });

    it('persiste el candidato invocando Prisma sin usar una base de datos real (mock)', async () => {
        const payload = {
            firstName: 'Laura',
            lastName: 'García',
            email: 'laura@example.com',
        };

        const saved = await addCandidate(payload);

        expect(saved.id).toBe(42);
        expect(prismaMock.candidate.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.candidate.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                firstName: 'Laura',
                lastName: 'García',
                email: 'laura@example.com',
            }),
        });
    });
});
