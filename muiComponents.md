## Tabla comparativa de MUI vs HTML

| **Etiqueta HTML**    | **Componente MUI**                                             | **Descripción**                                                                                                |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `<div>`              | `<Box>`                                                        | Contenedor genérico con soporte para estilos y propiedades de sistema de MUI.                                  |
| `<button>`           | `<Button>`                                                     | Botón con estilos y variantes predefinidas (como `contained`, `outlined`, etc.).                               |
| `<a>`                | `<Link>`                                                       | Enlace con estilos de MUI y soporte para la navegación en aplicaciones React.                                  |
| `<input>`            | `<TextField>`                                                  | Campo de entrada de texto con estilos y funcionalidades avanzadas.                                             |
| `<textarea>`         | `<TextField multiline />`                                      | Campo de texto multilínea.                                                                                     |
| `<select>`           | `<Select>`                                                     | Menú desplegable para seleccionar opciones.                                                                    |
| `<option>`           | `<MenuItem>`                                                   | Opción dentro de un menú desplegable (`<Select>`).                                                             |
| `<img>`              | `<Avatar>`, `<CardMedia>`, o `<img>` dentro de `<Box>`         | Dependiendo del caso, puedes usar `Avatar` para imágenes circulares o `CardMedia` para imágenes en tarjetas.   |
| `<h1>`, `<h2>`, etc. | `<Typography variant="h1">`, `<Typography variant="h2">`, etc. | Componente para texto con variantes predefinidas (h1, h2, body1, etc.).                                        |
| `<p>`                | `<Typography variant="body1">`                                 | Párrafo con estilos de MUI.                                                                                    |
| `<ul>`               | `<List>`                                                       | Lista no ordenada.                                                                                             |
| `<li>`               | `<ListItem>`                                                   | Elemento de una lista.                                                                                         |
| `<table>`            | `<Table>`                                                      | Tabla con estilos de MUI.                                                                                      |
| `<thead>`            | `<TableHead>`                                                  | Cabecera de la tabla.                                                                                          |
| `<tbody>`            | `<TableBody>`                                                  | Cuerpo de la tabla.                                                                                            |
| `<tr>`               | `<TableRow>`                                                   | Fila de la tabla.                                                                                              |
| `<th>`               | `<TableCell>` (con `component="th"`)                           | Celda de cabecera.                                                                                             |
| `<td>`               | `<TableCell>`                                                  | Celda de la tabla.                                                                                             |
| `<form>`             | `<form>` (puedes usar `<Box component="form">` para estilos)   | Formulario. MUI no tiene un componente específico para `<form>`, pero puedes usar `<Box>` para añadir estilos. |
| `<label>`            | `<InputLabel>`                                                 | Etiqueta para campos de formulario.                                                                            |
| `<nav>`              | `<AppBar>`, `<Drawer>`, o `<Box component="nav">`              | Barra de navegación o menú lateral.                                                                            |
| `<header>`           | `<AppBar>`                                                     | Barra superior de la aplicación.                                                                               |
| `<footer>`           | `<Box component="footer">`                                     | Pie de página. MUI no tiene un componente específico para `<footer>`, pero puedes usar `<Box>`.                |
| `<section>`          | `<Box component="section">`                                    | Sección de contenido.                                                                                          |
| `<article>`          | `<Box component="article">`                                    | Artículo de contenido.                                                                                         |
| `<aside>`            | `<Drawer>`                                                     | Barra lateral o menú desplegable.                                                                              |
| `<dialog>`           | `<Dialog>`                                                     | Ventana modal o diálogo.                                                                                       |
| `<progress>`         | `<LinearProgress>` o `<CircularProgress>`                      | Barra de progreso lineal o circular.                                                                           |
| `<span>`             | `<Typography component="span">`                                | Texto en línea con estilos de MUI.                                                                             |
| `<hr>`               | `<Divider>`                                                    | Línea divisoria.                                                                                               |
| `<checkbox>`         | `<Checkbox>`                                                   | Casilla de verificación.                                                                                       |
| `<radio>`            | `<Radio>`                                                      | Botón de opción.                                                                                               |
| `<svg>`              | `<SvgIcon>`                                                    | Icono SVG personalizado.                                                                                       |
| `<icon>`             | `<Icon>` (para iconos de Material Icons)                       | Icono de Material Icons.                                                                                       |

---

### Notas adicionales:

1. **Flexibilidad**: Muchos componentes de MUI, como `<Box>` y `<Typography>`, pueden adaptarse a diferentes roles usando la propiedad `component`. Por ejemplo:

   ```jsx
   <Box component="header">Este es un header</Box>
   ```

2. **Estilos**: MUI utiliza su sistema de estilos basado en `sx` y `styled`, lo que permite personalizar fácilmente los componentes.

3. **Accesibilidad**: Los componentes de MUI están diseñados para ser accesibles por defecto, lo que los hace una excelente opción para reemplazar etiquetas HTML simples.

4. **Iconos**: Para iconos, MUI proporciona el componente `<Icon>` y una amplia biblioteca de iconos de Material Icons.

---
