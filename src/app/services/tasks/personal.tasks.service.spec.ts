import { TestBed } from '@angular/core/testing';

import { PersonalTasksService } from './personal.tasks.service';

describe('PersonalTasksService', () => {
  let service: PersonalTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
