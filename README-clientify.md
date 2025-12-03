# Integración de Formularios con Clientify - Instrucciones Completas

## 📋 Archivos HTML Generados

Se han creado 6 formularios HTML estáticos, uno para cada tipo de solicitud:

1. **formulario-certificacion.html** - Certificación como Coach de Ventas
2. **formulario-consultoria.html** - Presupuesto de Consultoría Comercial
3. **formulario-formacion.html** - Formación para fuerza de ventas
4. **formulario-licencias.html** - Licencia TEST CIREXCO
5. **formulario-colaborar.html** - Colaborar con CIE Barcelona
6. **formulario-otros.html** - Otros (recomendación, queja, sugerencia)

## 🚀 Paso 1: Subir Archivos a tu Servidor

1. Sube toda la carpeta `html-forms/` a tu servidor web
2. Asegúrate de que la estructura de carpetas se mantenga:
   ```
   tu-servidor/
   └── formularios/              (o el nombre que prefieras)
       ├── formulario-certificacion.html
       ├── formulario-consultoria.html
       ├── formulario-formacion.html
       ├── formulario-licencias.html
       ├── formulario-colaborar.html
       ├── formulario-otros.html
       └── assets/
           └── logo-20con-20texto-20color-281-29.png
   ```

3. **Verifica que los formularios sean accesibles** desde URLs como:
   - `https://tudominio.com/formularios/formulario-certificacion.html`
   - `https://tudominio.com/formularios/formulario-consultoria.html`
   - etc.

**⚠️ IMPORTANTE:** Anota las URLs exactas de cada formulario. Las necesitarás para configurar las Arañas en Clientify.

---

## 🕷️ Paso 2: Crear Arañas en Clientify

Para **cada formulario**, debes crear una "Araña" en Clientify. Repite este proceso 6 veces:

### A. Acceder a Arañas Web

1. Inicia sesión en Clientify
2. Ve a **Configuración** → **Integraciones** → **Arañas Web**
3. Haz clic en **"Crear nueva araña"** o **"+ Nueva Araña"**

### B. Configurar la Araña

1. **Nombre de la araña:** Dale un nombre descriptivo
   - Ejemplo: "Formulario Certificación CIE Barcelona"
   - Ejemplo: "Formulario Consultoría CIE Barcelona"

2. **URL del formulario:** Pega la URL exacta donde está alojado el formulario
   - ✅ Correcto: `https://tudominio.com/formularios/formulario-certificacion.html`
   - ❌ Incorrecto: `https://tudominio.com/formularios/` (falta el archivo específico)

3. **Detección automática:** Clientify escaneará la URL y detectará el formulario HTML automáticamente

4. **Seleccionar el evento disparador:**
   - ✅ **Opción recomendada:** "Cuando se envía el formulario" (submit event)
   - Alternativa: "Cuando se hace clic en el botón ENVIAR"

   > 💡 **Tip:** La opción "submit event" es más confiable porque captura el envío del formulario completo

5. Haz clic en **"Guardar"** o **"Siguiente"**

### C. Mapear Campos del Formulario

Ahora debes asociar cada campo del HTML con los campos correspondientes en Clientify.

---

## 📊 Paso 3: Mapeo de Campos

Clientify mostrará todos los campos detectados en el formulario HTML (por su atributo `name`). Debes mapear cada uno a un campo de Clientify.

### 🎓 Mapeo para: formulario-certificacion.html

| Campo HTML (`name`) | Campo en Clientify | Tipo | Requerido | Notas |
|---------------------|-------------------|------|-----------|-------|
| `email` | Email | Email | ✅ Sí | Campo principal de contacto |
| `first_name` | Nombre | Texto | ✅ Sí | |
| `last_name` | Apellidos | Texto | ✅ Sí | |
| `whatsapp` | Teléfono / WhatsApp | Teléfono | ✅ Sí | Con indicativo internacional |
| `city` | Ciudad | Texto | ✅ Sí | |
| `country` | País | Texto | ✅ Sí | Código país (ES, MX, CO, etc.) |
| `edition` | Edición Certificación | Lista/Texto | ✅ Sí | Ciudad de la edición |
| `linkedin` | LinkedIn | URL | No | Perfil de LinkedIn |
| `company_name` | Empresa | Texto | ✅ Sí | Empresa actual |
| `sector` | Sector | Texto | No | Sector de actividad |
| `sales_position` | Cargo Ventas | Texto | No | Cargo en ventas |
| `years_experience` | Años Experiencia | Texto/Número | No | Años en ventas |
| `coaching_experience` | Experiencia Coaching | Texto | No | Experiencia previa |
| `motivations` | Motivaciones | Texto largo | No | Razones para certificarse |
| `program_source` | Fuente | Lista/Texto | No | Cómo conoció el programa |
| `legal_scholarship` | Acepta Becas | Booleano/Checkbox | ✅ Sí | Términos de becas |
| `legal_privacy` | Acepta Privacidad | Booleano/Checkbox | ✅ Sí | Política privacidad |
| `timestamp` | Fecha Solicitud | Fecha/Hora | No | Auto-generado en JS |
| `form_type` | Tipo Formulario | Texto | No | Valor: "certificacion" |

---

### 💼 Mapeo para: formulario-consultoria.html

| Campo HTML (`name`) | Campo en Clientify | Tipo | Requerido | Notas |
|---------------------|-------------------|------|-----------|-------|
| `email` | Email | Email | ✅ Sí | |
| `first_name` | Nombre | Texto | ✅ Sí | |
| `last_name` | Apellidos | Texto | ✅ Sí | |
| `whatsapp` | Teléfono | Teléfono | ✅ Sí | |
| `position` | Cargo | Texto | ✅ Sí | Cargo del contacto |
| `city` | Ciudad | Texto | ✅ Sí | |
| `country` | País | Texto | ✅ Sí | |
| `company_name` | Empresa | Texto | ✅ Sí | Razón social |
| `cif` | CIF / NIF | Texto | No | Identificación fiscal |
| `sector` | Sector | Texto | No | |
| `sales_team_size` | Tamaño Equipo Ventas | Texto/Número | No | Número de personas |
| `subject` | Asunto / Descripción | Texto largo | No | Descripción petición |
| `program_source` | Fuente | Lista/Texto | No | |
| `legal_privacy` | Acepta Privacidad | Booleano | No | |
| `timestamp` | Fecha Solicitud | Fecha/Hora | No | |
| `form_type` | Tipo Formulario | Texto | No | Valor: "consultoria" |

---

### 📚 Mapeo para: formulario-formacion.html

| Campo HTML (`name`) | Campo en Clientify | Tipo | Requerido |
|---------------------|-------------------|------|-----------|
| `email` | Email | Email | ✅ Sí |
| `first_name` | Nombre | Texto | ✅ Sí |
| `last_name` | Apellidos | Texto | ✅ Sí |
| `whatsapp` | Teléfono | Teléfono | ✅ Sí |
| `position` | Cargo | Texto | ✅ Sí |
| `city` | Ciudad | Texto | ✅ Sí |
| `country` | País | Texto | ✅ Sí |
| `company_name` | Empresa | Texto | ✅ Sí |
| `cif` | CIF | Texto | No |
| `sector` | Sector | Texto | No |
| `subject` | Asunto | Texto largo | No |
| `program_source` | Fuente | Lista/Texto | No |
| `legal_privacy` | Acepta Privacidad | Booleano | No |
| `form_type` | Tipo Formulario | Texto | No |

**Valor de `form_type`:** "formacion"

---

### 📜 Mapeo para: formulario-licencias.html

Igual que **formacion**, pero con un campo adicional:

| Campo adicional | Mapeo |
|----------------|-------|
| `license_quantity` | Cantidad Licencias (Número) |

**Valor de `form_type`:** "licencias"

---

### 🤝 Mapeo para: formulario-colaborar.html

Idéntico a **formacion**.

**Valor de `form_type`:** "colaborar"

---

### 📝 Mapeo para: formulario-otros.html

Idéntico a **formacion**.

**Valor de `form_type`:** "otros"

---

## 🔧 Paso 4: Insertar Script de la Araña

Después de configurar la araña, Clientify generará un **código JavaScript** que debes insertar en el HTML.

### A. Copiar el Script Generado

1. Una vez creada la araña, Clientify te mostrará un script similar a:
   ```html
   <script>
     (function() {
       var clientifyScript = document.createElement('script');
       clientifyScript.src = 'https://app.clientify.com/web-forms/ABC123XYZ.js';
       document.body.appendChild(clientifyScript);
     })();
   </script>
   ```

2. Copia **todo el script** (incluidas las etiquetas `<script>`)

### B. Insertar en el Archivo HTML

1. Abre el archivo HTML correspondiente (ej: `formulario-certificacion.html`)
2. Busca el comentario cerca del final del archivo:
   ```html
   // <!-- ESPACIO PARA INSERTAR SCRIPT DE CLIENTIFY ARAÑA -->
   ```

3. **Pega el script justo debajo** de ese comentario, antes del cierre `</script>`:
   ```html
   // <!-- ESPACIO PARA INSERTAR SCRIPT DE CLIENTIFY ARAÑA -->
   <script>
     (function() {
       var clientifyScript = document.createElement('script');
       clientifyScript.src = 'https://app.clientify.com/web-forms/ABC123XYZ.js';
       document.body.appendChild(clientifyScript);
     })();
   </script>
   ```

4. **Guarda el archivo** y súbelo nuevamente al servidor (reemplazando el anterior)

### C. Verificar Inserción

Abre el formulario en tu navegador y:
1. Presiona `F12` (o clic derecho → Inspeccionar)
2. Ve a la pestaña **"Network"** (Red)
3. Recarga la página
4. Busca una petición a `clientify.com` o `web-forms/...js`
5. ✅ Si aparece, el script está cargando correctamente

---

## ✅ Paso 5: Probar el Formulario

1. Abre el formulario en tu navegador: `https://tudominio.com/formularios/formulario-certificacion.html`

2. **Completa todos los campos obligatorios** (marcados con `*`)

3. Haz clic en **ENVIAR**

4. El formulario mostrará la pantalla de éxito

5. **Verifica en Clientify:**
   - Ve a **Contactos** o **Leads**
   - Busca el contacto recién creado (por email)
   - Revisa que todos los campos se hayan mapeado correctamente

6. Si hay problemas:
   - Revisa la **consola del navegador** (F12) para ver errores JavaScript
   - Verifica que el script de la araña esté cargando
   - Comprueba que los campos `name` del HTML coincidan con el mapeo

---

## 🔁 Paso 6: Repetir para Cada Formulario

Repite los pasos 2-5 para **cada uno de los 6 formularios**:

- [ ] formulario-certificacion.html
- [ ] formulario-consultoria.html
- [ ] formulario-formacion.html
- [ ] formulario-licencias.html
- [ ] formulario-colaborar.html
- [ ] formulario-otros.html

**Resultado:** Tendrás 6 arañas configuradas en Clientify, una por cada formulario.

---

## ✨ Ventajas de esta Estructura para Clientify

✅ **Estructura HTML estática:** Los campos no cambian dinámicamente, ideal para las Arañas
✅ **URLs separadas:** Cada formulario tiene su propia URL única y fácil de configurar
✅ **Campos con `name` consistentes:** Fácil de mapear en Clientify, sin ambigüedades
✅ **Sin dependencias complejas:** Los formularios funcionan con HTML + CSS + JS puro
✅ **Validación HTML5 nativa:** Campos `required`, `type="email"`, etc. funcionan sin JavaScript
✅ **Compatible con Tailwind CDN:** Estilos visuales modernos sin necesidad de build
✅ **Independientes del proyecto Next.js:** Pueden alojarse en cualquier servidor

---

## ⚠️ Limitaciones y Consideraciones

### Lo que NO incluye esta versión:

❌ **Sin guardado automático en localStorage:** Simplificado para Clientify (los datos NO se guardan si cierras la página)
❌ **Validación básica:** Solo HTML5 + JavaScript simple (no validaciones complejas)
❌ **Pantallas de éxito/error simuladas:** No hay conexión real con backend (Clientify maneja el envío)
❌ **Sin envío real a API:** El formulario no hace `fetch()` manual, depende 100% del script de Clientify

### Lo que SÍ incluye:

✅ Validación de campos requeridos antes de enviar
✅ Validación de formato de email
✅ Mensajes de éxito/error visuales
✅ Log de datos en consola para debug
✅ Estilos profesionales con Tailwind CSS
✅ Responsive design (funciona en móvil)

---

## 🔍 Troubleshooting: Solución de Problemas

### Problema 1: La Araña no detecta el formulario

**Causas posibles:**
- URL incorrecta o inaccesible
- Formulario detrás de autenticación/login
- JavaScript bloqueado por CORS

**Solución:**
1. Verifica que la URL sea pública y accesible
2. Abre la URL en modo incógnito y confirma que carga
3. Revisa que no haya errores en la consola del navegador

---

### Problema 2: Los campos no se mapean correctamente

**Causas posibles:**
- Los atributos `name` del HTML no coinciden
- Campos dinámicos que cambian de nombre

**Solución:**
1. Abre el HTML y verifica los atributos `name`:
   ```html
   <input type="text" id="first_name" name="first_name">
   ```
2. En Clientify, busca exactamente ese nombre: `first_name`
3. Si no aparece, re-detecta el formulario en Clientify

---

### Problema 3: El formulario no envía datos a Clientify

**Causas posibles:**
- Script de la araña no insertado o mal insertado
- Evento submit bloqueado por JavaScript

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores JavaScript
3. Verifica que el script de Clientify esté cargando:
   ```
   Network → Buscar: web-forms/...js
   ```
4. Si no carga, revisa que hayas pegado el script correctamente

---

### Problema 4: El formulario dejó de funcionar después de editarlo

**Causas posibles:**
- Cambiaste la estructura HTML
- Añadiste/quitaste campos
- La araña perdió la referencia

**Solución:**
1. Ve a Clientify → Arañas
2. Edita la araña afectada
3. Haz clic en **"Re-detectar formulario"**
4. Clientify escaneará el HTML actualizado
5. Re-mapea los campos si es necesario
6. Guarda los cambios

---

### Problema 5: Los checkboxes no se capturan correctamente

**Solución:**
En Clientify, mapea los checkboxes a campos de tipo **Booleano** o **Sí/No**:
- `legal_scholarship` → Campo Booleano
- `legal_privacy` → Campo Booleano

Los formularios ya convierten los checkboxes a `true`/`false` en JavaScript.

---

## 📚 Recursos Adicionales

### Documentación de Clientify

- **Arañas Web:** Consulta la documentación oficial de Clientify sobre cómo usar Arañas
- **Mapeo de Campos:** Guía de tipos de campos soportados
- **Soporte:** Contacta al soporte técnico de Clientify para problemas específicos

### Verificación de Formularios

Para cada formulario, puedes verificar que esté correctamente estructurado:

1. Abre el formulario en el navegador
2. Presiona F12 → Consola
3. Completa y envía el formulario
4. Verifica que aparezca el log: `Form Data: { ... }`
5. Revisa que todos los campos tengan valores

---

## 📧 Campos de Contacto Principales

**IMPORTANTE:** Asegúrate de mapear correctamente estos campos críticos en Clientify:

| Campo | Tipo en Clientify | Obligatorio |
|-------|-------------------|-------------|
| `email` | Email (principal) | ✅ Sí |
| `first_name` | Nombre | ✅ Sí |
| `last_name` | Apellidos | ✅ Sí |
| `whatsapp` | Teléfono | ✅ Sí |
| `company_name` | Empresa | ✅ Sí |

Estos son los campos mínimos que Clientify necesita para crear un contacto/lead.

---

## 🎯 Próximos Pasos Opcionales

Una vez que todos los formularios estén funcionando:

1. **Crear página índice:** Crea un `index.html` con enlaces a los 6 formularios
2. **Personalizar mensajes:** Edita los textos de éxito/error en cada HTML
3. **Añadir Google Analytics:** Inserta código de tracking si lo necesitas
4. **Configurar redirects:** Configura redirecciones amigables en tu servidor
5. **Testing A/B:** Crea variantes de formularios para probar conversiones

---

## ✉️ Soporte

Para problemas con:

- **Formularios HTML:** Revisa la consola del navegador (F12) para errores JavaScript
- **Arañas de Clientify:** Consulta documentación de Clientify o contacta su soporte técnico
- **Mapeo de campos:** Verifica que los atributos `name` del HTML coincidan exactamente
- **Estilos visuales:** Revisa que Tailwind CSS esté cargando correctamente desde CDN

---

## 📝 Notas Finales

- **Backups:** Guarda una copia de seguridad de estos archivos HTML
- **Versionado:** Si haces cambios, documenta qué modificaste
- **Testing:** Prueba cada formulario después de subirlo al servidor
- **Mantenimiento:** Si Clientify actualiza sus scripts, puede que necesites actualizar

---

**¡Listo!** 🎉 Ahora tienes 6 formularios HTML estáticos completamente funcionales y optimizados para integrarse con las Arañas de Clientify.

Si tienes dudas o problemas, revisa la sección de Troubleshooting o contacta al soporte de Clientify.
