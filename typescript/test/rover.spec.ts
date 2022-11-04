import { mapFromPosition, mapToPosition, processInstruction, rover } from '../src/rover';

describe('check rover', () => {

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
        x: 0,
        y: 0,
        facing: 'n'
      });
    });
    it('convert to another position', () => {
      expect(mapToPosition('2 3 e')).toEqual({
        x: 2,
        y: 3,
        facing: 'e'
      });
    });
    it('convert from position', () => {
      expect(mapFromPosition({
        x: 2,
        y: 3,
        facing: 'e'
      })).toEqual('2 3 e');
    });
  });

  describe('process move instruction', () => {
    it('move forward from 0 0 e', () => {
      expect(processInstruction({
        x: 0,
        y: 0,
        facing: 'e'
      }, 'f')).toEqual({
        x: 1,
        y: 0,
        facing: 'e'
      });
    });
    it('move forward from 2 2 e', () => {
      expect(processInstruction({
        x: 2,
        y: 2,
        facing: 'e'
      }, 'f')).toEqual({
        x: 3,
        y: 2,
        facing: 'e'
      });
    });
    it('move forward from 0 0 n', () => {
      expect(processInstruction({
        x: 0,
        y: 0,
        facing: 'n'
      }, 'f')).toEqual({
        x: 0,
        y: 1,
        facing: 'n'
      });
    });
    it('move backward from 0 0 n', () => {
      expect(processInstruction({
        x: 0,
        y: 0,
        facing: 'n'
      }, 'b')).toEqual({
        x: 0,
        y: -1,
        facing: 'n'
      });
    });
    it('move backward from 0 0 w', () => {
      expect(processInstruction({
        x: 0,
        y: 0,
        facing: 'w'
      }, 'f')).toEqual({
        x: -1,
        y: 0,
        facing: 'w'
      });
    });
  });

  describe('process orientation instruction', () => {
    it('change orientation to face north', () => {
      expect(processInstruction({
        x: 0,
        y: 0,
        facing: 'e'
      }, 'n')).toEqual({
        x: 0,
        y: 0,
        facing: 'n'
      });
    });
  });

});
