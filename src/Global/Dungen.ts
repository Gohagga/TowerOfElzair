import { DungeonGenerator } from "../../node_modules/@dungen/dungen/src/DungeonGenerator";
import { Template } from "../../node_modules/@dungen/dungen/Template";
import { FixedSquareRoomPlacer } from "../../node_modules/@dungen/dungen/FixedSquareRoomPlacer";
import { BossRoomBuilder } from "../../node_modules/@dungen/dungen/BossRoomBuilder";
import { MapUtils } from "../../node_modules/@dungen/dungen/MapUtils";

export class Dungen {
    static models: Record<string, ((x: number, y: number) => void)[]> = {
        '-': [(x: number, y: number) => {

        }],

        '|': [(x: number, y: number) => {

        }],

        '+': [(x: number, y: number) => {

        }],

        'o': [(x: number, y: number) => {

        }],

        't': [(x: number, y: number) => {

        }],

        's': [(x: number, y: number) => {

        }]
    };

    public static generateDungeon(roomTemplates: string[]) {

        print(0);
        let w = 5, h = 5;
        const templates: Template[] = []
        print(1);
        for (let t of roomTemplates) {
            templates.push(
                { map: t, width: w, height: h }
            )
        }
        print(2);

        let width = 30;
        let height = 30;
        let space: string = " ";
        let map = "";
        let i = 0, j = 0;
        while (j++ < height) {
            while (i++ < width) { map += " " }
            map += "\n";
        }

        // print(`s${map}e`);

        print(3);
        let dunggg = new DungeonGenerator(map)
            .addTemplates(templates)
            .setLayoutBuilder(new FixedSquareRoomPlacer(w, h))
            .setGoalRoomBuilder(new BossRoomBuilder)
            .setMaxRooms(99);
        print(3.5);

        let dungeon = dunggg
            .buildDungeon();

        print(4);
        print(dungeon);

        CameraSetupApply(gg_cam_Camera_001, true, true);
        SetFogStateRect(Player(0), FOG_OF_WAR_VISIBLE, bj_mapInitialPlayableArea, true);
     
        let blockSize = 320;
        let startX = -blockSize * 0.5 * width; //2048;
        let startY = -blockSize * 0.5 * height; //-2560;

        dungeon.rooms.forEach((room, i) => {
            // print(room.x, room.y);
            let x = startX + room.x * blockSize;
            let y = startY + room.y * blockSize;
            print(x, y);
            // print(room.map)
            let hash = MapUtils.getDestructuredMap(room.map);
            
            // Replace the doors first
            for (let i = 0; i < 5; i++) {
                if (room.doors && room.doors[i]) {
                    let door = room.doors[i];
                    if (hash[door.dest.y - room.y] && 
                        hash[door.dest.y - room.y][door.dest.x - room.x]) {
                            hash[door.dest.y - room.y][door.dest.x - room.x] = ' ';
                        }

                    if (hash[door.ent.y - room.y] && 
                        hash[door.ent.y - room.y][door.ent.x - room.x]) {
                            hash[door.ent.y - room.y][door.ent.x - room.x] = ' ';
                        }
                }
            }
            for (let i = 0; i < hash.length; i++) {
                for (let j = 0; j < hash[i].length; j++) {
                    let stamp = hash[i][j];
                    if (stamp && this.models[stamp]) {
                        print(stamp)
                        print("gonna call it")
                        this.models[stamp][Math.floor(Math.random() * (this.models[stamp].length - 1))](x + j * blockSize + 32, y + i * blockSize + 32);
                    }
                }
            }
            // for (let k = 0; k < room.map.length; k++) {
            //     let r = room.map[k];
            //     // print(r)

            // }
            //CreateUnit(Player(0), FourCC('hpea'), x, y, 0.0);
        });

        print(5);

        // for (let i = 0; i < 7; i++) {
        //     for (let j = 0; j < 7; j++) {
        //         let c = hash[i][j];

        //         let x = i * 360;
        //         let y = j * 360;
        //         if (this.models[c].length > 0) {
        //             CreateUnit(Player(0), FourCC('hpea'), x, y, 0.0);
        //             // let id = this.models[c][0];
        //             // if (!CreateDestructable(id, x, y, 0, 1, 4)) {
        //             //     print("Could not create Destructable", GetObjectName(id));
        //             // }
        //         }
        //     }
        // }
    }

    static init() {
        
        print(-1);
        let roomTemplates = [
`+---+
|o o|
|   |
|o o|
+---+
`,
`+---+
|s s|
|   |
|s s|
+---+`,
`+---+
|   |
| o |
|   |
+---+`,
`+---+
|  t|
|t t|
|   |
+---+`,
`+---+
|t t|
|   |
|tt |
+---+`,
`+---+
| | |
|-o-|
| | |
+---+`
        ];

        this.setupStamps();
        this.generateDungeon(roomTemplates);
    }

    static setupStamps() {

        let stamps = [
            { id: '-', rect: gg_rct_RegionMinus, rects: [gg_rct_RegionS_Copy, gg_rct_RegionS_Copy_2, gg_rct_RegionS_Copy_3, gg_rct_RegionS_Copy_4, gg_rct_RegionS_Copy_5] },
            { id: '|', rect: gg_rct_RegionPipe, rects: [gg_rct_RegionS_Copy_6, gg_rct_RegionS_Copy_19, gg_rct_RegionS_Copy_18, gg_rct_RegionS_Copy_17, gg_rct_RegionS_Copy_16] },
            { id: '+', rect: gg_rct_RegionPlus, rects: [gg_rct_RegionS_Copy_7, gg_rct_RegionS_Copy_20, gg_rct_RegionS_Copy_25, gg_rct_RegionS_Copy_24, gg_rct_RegionS_Copy_15] },
            { id: 'o', rect: gg_rct_RegionO },
            { id: 't', rect: gg_rct_RegionT },
        ]

        stamps.forEach(stamp => {
            let sx = GetRectMinX(stamp.rect);
            let sy = GetRectMinY(stamp.rect);

            let rects = [];
            if (stamp.rects) {
                rects.push(...stamp.rects);
            } else {
                rects = [stamp.rect];
            }

            let cb: ((x: number, y: number) => void)[] = [];
            for (let rect of rects) {
                let dests: destructable[] = [];
                EnumDestructablesInRect(rect, null, () => { dests.push(GetEnumDestructable()) });
                cb.push((x: number, y: number) => {
                    print("HAS BEEN CALLED")
                    print(stamp.id);
                    for (let dest of dests) {
                        print(GetDestructableName(dest));
                        let id = GetDestructableTypeId(dest);
                        let tx = GetDestructableX(dest) - sx + x;
                        let ty = GetDestructableY(dest) - sy + y;
                        // CreateUnit(Player(0), FourCC('hpea'), tx, ty, 0.0);
                        CreateDestructable(id, tx, ty, 0, 1.5, 4);
                    }
                });
            }
            this.models[stamp.id] = cb;
        });
    }
}