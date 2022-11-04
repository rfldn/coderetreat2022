import { mapFromPosition, mapToPosition, processInstruction, rover } from '../src/rover';

describe('check rover', () => {

  describe("test rover function with multiple movements", () => {
    it("should return the new position of the rover", () => {
      expect(rover('2 3 e\nf b')).toBe("2 3 e");
    });
    it("should return the new position of the rover", () => {
      expect(rover('2 3 e\nf f')).toBe("4 3 e");
    });
  });

  describe("test rover function", () => {
    it("should return the position of the rover", () => {
      expect(rover('2 3 e')).toBe("2 3 e");
    });
    it("should return the new position of the rover", () => {
      expect(rover('2 3 e\nf')).toBe("3 3 e");
    });
  });

  describe('test position mapper', function () {
    it('convert to position', () => {
      expect(mapToPosition('0 0 n')).toEqual({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'n'
      });
    });
    it('convert to another position', () => {
      expect(mapToPosition('2 3 e')).toEqual({
        coordinates: {
          x: 2,
          y: 3,
        },
        facing: 'e'
      });
    });
    it('convert from position', () => {
      expect(mapFromPosition({
        coordinates: {
          x: 2,
          y: 3,
        },
        facing: 'e'
      })).toEqual('2 3 e');
    });
  });

  describe('process move instruction', () => {
    it('move forward from 0 0 e', () => {
      expect(processInstruction({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'e'
      }, 'f')).toEqual({
        coordinates: {
          x: 1,
          y: 0,
        },
        facing: 'e'
      });
    });
    it('move forward from 2 2 e', () => {
      expect(processInstruction({
        coordinates: {
          x: 2,
          y: 2,
        },
        facing: 'e'
      }, 'f')).toEqual({
        coordinates: {
          x: 3,
          y: 2,
        },
        facing: 'e'
      });
    });
    it('move forward from 0 0 n', () => {
      expect(processInstruction({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'n'
      }, 'f')).toEqual({
        coordinates: {
          x: 0,
          y: 1,
        },
        facing: 'n'
      });
    });
    it('move backward from 0 0 n', () => {
      expect(processInstruction({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'n'
      }, 'b')).toEqual({
        coordinates: {
          x: 0,
          y: -1,
        },
        facing: 'n'
      });
    });
    it('move backward from 0 0 w', () => {
      expect(processInstruction({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'w'
      }, 'f')).toEqual({
        coordinates: {
          x: -1,
          y: 0,
        },
        facing: 'w'
      });
    });
  });

  describe('process orientation instruction', () => {
    it('change orientation to face north', () => {
      expect(processInstruction({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'e'
      }, 'n')).toEqual({
        coordinates: {
          x: 0,
          y: 0,
        },
        facing: 'n'
      });
    });
  });

})
;
