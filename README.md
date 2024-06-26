﻿# tugas-besar-grafkom-1-geometrybois

## Anggota Kelompok GeometryBois
| Nama                               | NIM       | github |
| ---------------------------------- | --------- | --- |
| Muhammad Farrel Danendra Rachim    | 13521048  | [Breezy-DR](https://github.com/Breezy-DR) |
| Muhammad Fadhil Amri               | 13521066  | [Mehmed13](https://github.com/Mehmed13) |
| Akmal Mahardika Nurwahyu Pratama   | 13521070  | [akmaldika](https://github.com/akmaldika) |

## Daftar Isi

- [tugas-besar-grafkom-1-geometrybois](#tugas-besar-grafkom-1-geometrybois)
  - [Anggota Kelompok GeometryBois](#anggota-kelompok-geometrybois)
  - [Daftar Isi](#daftar-isi)
  - [Deskripsi Singkat](#deskripsi-singkat)
  - [Struktur Program](#struktur-program)
  - [Fitur Program](#fitur-program)
  - [Cara Menjalankan Program](#cara-menjalankan-program)

## Deskripsi Singkat

WebGL merupakan kakas dengan spesialisasi pada ranah grafika yang dapat dengan mudah diintegrasikan pada web. Dengan menggunakan WebGL, kita dapat mengimplementasikan web dengan fitur menggambar, mengedit, dan memvisualisasikan sejumlah model pada kanvas HTML. Selain itu, WebGL juga mengutilisasikan GPU untuk melakukan rendering dan transformasi geometri. Oleh karena itu, aplikasi Geometry Bois menggunakan WebGL sebagai tools untuk memodelkan berbagai bentuk geometri.

## Struktur Program

```
.
│   README.md
│
├───doc
│   │   Laporan_Tugas Besar 1_IF3260_13521048_13521066_13521070.pdf
│       .gitkeep
│
├───src
│   │   index.html
│   │   main.js
│   │   style.css
│   │
│   └───module
│       ├───components
│       │       clickedShapeInfo.js
│       │       drawingInfo.js
│       │       tabs-component.js
│       │
│       ├───core
│       │       drawer.js
│       │       GLDrawing.js
│       │
│       ├───models
│       │       example.gl.js
│       │       garis.js
│       │       node2.js
│       │       persegi.js
│       │       persegiPanjang.js
│       │       polygon.js
│       │       shape.js
│       │
│       ├───shader
│       │       fragmentShader.js
│       │       vertexShader.js
│       │
│       ├───type
│       │       bufferType.js
│       │       shapeTypes.js
│       │
│       └───utils
│               CanvasResize.js
│               color.js
│               convexhull.js
│               coordinate2D.js
│               GLSLProgram.js
│               point.js
│               transform2.js
│               vector2.js
│
└───test
    │   .gitkeep
    │   test.js
    │
    └───pohon_dan_rumah_burung
            AtapRumahBurung_Poligon.json
            BatangPohon_PersegiPanjang.json
            DahanPohon_PersegiPanjang.json
            DaunPohon_Poligon.json
            RumaBurung.json
```

## Fitur Program

1. Pemodelan Garis
2. Pemodelan Persegi
3. Pemodelan Persegi Panjang
4. Pemodelan Poligon
5. Transformasi Geometri
6. Pewarnaan Vertex
7. Simpan / Unggah Model

## Cara Menjalankan Program

1. Lakukan `git clone` terhadap repository ini
2. Buka file `./src/index.html` pada local server. ex:live server 
