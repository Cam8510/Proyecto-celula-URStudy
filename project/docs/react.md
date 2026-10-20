``funcion declarativa``

function Saludo(){
    return <h1>Hola, StockFácil</h1>;
}
DOM(elemento) Diffing
TypeScript
Undefined

Tipos de formatos: .js o .jsx; .ts o .tsx

vite build tool(HMR(ese es el servidor local que recarga)) Como optimizar?-> npm run build esto es react+typescript

npm create vite@latest frontend -- --template react-ts

npm run dev: http://localhost:5173

Componentes es una funcion que devuelve una parte de la interfaz
<Header/>
<ProductoTabla/>
<ProductoFila/>
App
------Header
---------Resumen
------------ProductoTabla
---------------ProductoFila


class=
className=
for=
htmlFor=
<input></input>
<input/>
onclick=
onClick={funcion}

Props parametros de los componentes. los datos que los componentes padres le pasan a sus hijos.

function Saludo({nombre}: SaludoProps){
    return <p>Hola, {nombre}</p>
}
<Saludo nombre="Ana">

Estados: Son datos que pertenecen a un componente y que en teoria pueden cambiar.

let x
x=1
x=6
useState : metodo que le permite identificar el cambio 

const[contador, setContador]= useState(0);
<button onClick={()=>setContador(contador+1)}>
{contador}</button>