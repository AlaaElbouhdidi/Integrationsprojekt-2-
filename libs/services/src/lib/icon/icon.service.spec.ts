import { TestBed } from '@angular/core/testing';

import { IconService } from './icon.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

describe('IconService', () => {
    let service: IconService;
    const mockIcons: IconProp[] = [
        'user',
        'dragon',
        'spider',
        'frog',
        'fish',
        'chess-king',
        'cat',
        'dog',
        'otter',
        'hippo'
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IconService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all icons', () => {
        service.icons = mockIcons;
        expect(service.getIcons()).toBe(mockIcons);
    });

    it('should decode icon string', () => {
        const mockIconString = 'dragon/#ffffff/#ffffff';
        expect(service.decodeIconString(mockIconString)).toStrictEqual([
            'dragon',
            '#ffffff',
            '#ffffff'
        ]);
    });

    it('should encode icon string', () => {
        expect(
            service.encodeIconString('spider', '#c02121', '#250a0a')
        ).toStrictEqual('spider/#c02121/#250a0a');
    });
});
