// export class Point {

//     private _x: number;
//     private _y: number;
//     private _z: number;

//     constructor(x: number, y: number) {
//       this._x = x;
//       this._y = y;
//       this._z = 0;
//     }
  
//     public get x(): number {
//       return this._x;
//     }
  
//     public set x(value: number) {
//       this._x = value;
//     }
  
//     public get y(): number {
//       return this.y;
//     }
  
//     public set y(value: number) {
//       this._y = value;
//     }
  
//     /**
//      * This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
//      * If you attempt to use it in a synchronous manner, it may cause a desync.
//      */
//     public get z(): number {
//       return this._z;
//     }
  
//     public setPosition(x: number, y: number) {
//       this._x = x;
//       this._y = y;
//     }
  
//     public static fromHandle(handle: location): Point {
//       return new Point(GetLocationX(handle), GetLocationY(handle));
//     }
// }