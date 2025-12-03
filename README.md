# Formularios CIE Barcelona - Integración con Clientify

Proyecto de formularios HTML estáticos optimizados para integrarse con las **Arañas de Clientify** y desplegados en **Vercel**.

## 📋 Contenido del Proyecto

Este proyecto contiene 6 formularios HTML independientes:

1. **Certificación** - Certificación como Coach de Ventas
2. **Consultoría** - Presupuesto de Consultoría Comercial
3. **Formación** - Formación especializada para fuerza de ventas
4. **Licencias** - Licencia TEST CIREXCO
5. **Colaborar** - Colaboración con CIE Barcelona
6. **Otros** - Recomendaciones, quejas o sugerencias

## 🚀 Despliegue en Vercel

### Opción 1: Deployment Automático (Recomendado)

1. **Sube el proyecto a GitHub** (si aún no lo has hecho):
   ```bash
   git add .
   git commit -m "Preparar formularios para Vercel + Clientify"
   git push origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en **"New Project"**
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración de `vercel.json`
   - Haz clic en **"Deploy"**

3. **Anota tu URL de Vercel:**
   - Ejemplo: `https://cie-barcelona-formularios.vercel.app`
   - Esta será la URL base para configurar Clientify

### Opción 2: Deployment Manual con Vercel CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Desde la raíz del proyecto
vercel

# Para producción
vercel --prod
```

## 🌐 URLs de los Formularios

Una vez desplegado en Vercel, tus formularios estarán en:

```
https://tu-proyecto.vercel.app/                    → Página principal
https://tu-proyecto.vercel.app/certificacion       → Formulario Certificación
https://tu-proyecto.vercel.app/consultoria         → Formulario Consultoría
https://tu-proyecto.vercel.app/formacion           → Formulario Formación
https://tu-proyecto.vercel.app/licencias           → Formulario Licencias
https://tu-proyecto.vercel.app/colaborar           → Formulario Colaborar
https://tu-proyecto.vercel.app/otros               → Formulario Otros
```

**⚠️ IMPORTANTE:** Estas URLs **sin extensión `.html`** son las que debes usar para configurar las Arañas en Clientify.

## 🕷️ Configuración de Clientify

### Requisitos Cumplidos ✅

Este proyecto cumple con **TODOS** los requisitos de las Arañas de Clientify:

✅ **URLs concretas:** Cada formulario tiene su URL única y fija
✅ **Formularios estáticos:** Estructura HTML fija, sin cambios dinámicos
✅ **Campos con `name` consistentes:** Todos los inputs tienen atributos `name` fijos
✅ **Espacio para script:** Cada formulario tiene un espacio marcado para insertar el script de Clientify
✅ **Evento submit estándar:** Los formularios usan el evento `submit` nativo de HTML

### Pasos para Integrar con Clientify

1. **Crea 6 Arañas en Clientify** (una por cada formulario)

2. **Configura cada Araña:**
   - **URL del formulario:** Usa las URLs de Vercel (ej: `https://tu-proyecto.vercel.app/certificacion`)
   - **Evento disparador:** Selecciona "Cuando se envía el formulario" (submit event)

3. **Mapea los campos** según las tablas en `README-clientify.md`

4. **Inserta el script de la Araña:**
   - Copia el script generado por Clientify
   - Abre el archivo HTML correspondiente en tu editor
   - Busca el comentario: `<!-- ESPACIO PARA INSERTAR SCRIPT DE CLIENTIFY ARAÑA -->`
   - Pega el script justo después
   - Guarda y haz commit:
     ```bash
     git add formulario-certificacion.html
     git commit -m "Agregar script de Clientify para certificación"
     git push
     ```
   - Vercel redesplegará automáticamente

5. **Prueba el formulario:**
   - Completa y envía el formulario
   - Verifica en Clientify que el lead/contacto se creó correctamente

## 📁 Estructura del Proyecto

```
CIE-Sales-Form/
├── index.html                          # Página principal con enlaces
├── formulario-certificacion.html      # Formulario de Certificación
├── formulario-consultoria.html        # Formulario de Consultoría
├── formulario-formacion.html          # Formulario de Formación
├── formulario-licencias.html          # Formulario de Licencias
├── formulario-colaborar.html          # Formulario de Colaborar
├── formulario-otros.html              # Formulario de Otros
├── assets/
│   └── logo-20con-20texto-20color-281-29.png  # Logo CIE Barcelona
├── vercel.json                         # Configuración de Vercel
├── package.json                        # Metadata del proyecto
├── .gitignore                          # Archivos ignorados por Git
├── README.md                           # Este archivo
└── README-clientify.md                 # Guía detallada de Clientify
```

## 🔧 Características Técnicas

### Tecnologías Usadas

- **HTML5 puro:** Sin frameworks, máxima compatibilidad
- **Tailwind CSS (CDN):** Estilos modernos sin necesidad de build
- **JavaScript vanilla:** Validación nativa sin dependencias
- **Vercel:** Hosting con CDN global

### Validaciones Incluidas

✅ Validación HTML5 nativa (campos `required`, `type="email"`, etc.)
✅ Validación JavaScript personalizada antes de enviar
✅ Mensajes de error claros para el usuario
✅ Pantallas de éxito/error después del envío

### Optimizaciones

✅ **Clean URLs:** URLs sin extensión `.html` (configurado en `vercel.json`)
✅ **Security Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
✅ **Responsive Design:** Funciona en móvil, tablet y desktop
✅ **Performance:** HTML estático, carga instantánea
✅ **SEO:** Meta tags apropiados en cada formulario

## 📊 Mapeo de Campos para Clientify

### Campos Comunes (todos los formularios)

| Campo HTML | Clientify | Tipo | Requerido |
|------------|-----------|------|-----------|
| `email` | Email | Email | Sí |
| `first_name` | Nombre | Texto | Sí |
| `last_name` | Apellidos | Texto | Sí |
| `whatsapp` | Teléfono | Teléfono | Sí |
| `city` | Ciudad | Texto | Sí |
| `country` | País | Texto | Sí |
| `form_type` | Tipo Formulario | Texto | No |
| `timestamp` | Fecha | Fecha/Hora | No |

Para mapeos específicos de cada formulario, consulta **README-clientify.md**.

## 🧪 Pruebas Locales

Para probar los formularios localmente antes de desplegar:

### Con Python (simple):
```bash
# Desde la raíz del proyecto
python3 -m http.server 3000
```

Luego abre: `http://localhost:3000`

### Con cualquier servidor HTTP:
```bash
# Con Node.js (si tienes http-server instalado)
npx http-server -p 3000

# Con PHP
php -S localhost:3000
```

## 🔍 Troubleshooting

### Problema: Las URLs con `/certificacion` no funcionan localmente

**Solución:** Las clean URLs solo funcionan en Vercel. Localmente usa:
- `http://localhost:3000/formulario-certificacion.html`

### Problema: El logo no carga

**Verifica que:**
1. El archivo existe en `assets/logo-20con-20texto-20color-281-29.png`
2. El path en el HTML es `assets/...` (relativo, sin `/` al inicio)

### Problema: Clientify no detecta el formulario

**Verifica que:**
1. Usaste la URL de Vercel completa (ej: `https://tu-proyecto.vercel.app/certificacion`)
2. El formulario carga correctamente en esa URL
3. No hay errores en la consola del navegador (F12)

### Problema: Los datos no llegan a Clientify

**Verifica que:**
1. Insertaste correctamente el script de la Araña
2. El script está antes del cierre `</body>`
3. La Araña está activada en Clientify
4. El evento disparador es "submit"

## 📞 Soporte

- **Documentación Completa:** Lee `README-clientify.md` para instrucciones detalladas
- **Problemas con Vercel:** Consulta [docs.vercel.com](https://vercel.com/docs)
- **Problemas con Clientify:** Contacta al soporte de Clientify

## 📝 Notas Importantes

1. **Después de insertar el script de Clientify:**
   - Haz commit y push a GitHub
   - Vercel redesplegará automáticamente
   - Espera 1-2 minutos para que los cambios se propaguen

2. **URLs sin extensión:**
   - Usa `https://tu-proyecto.vercel.app/certificacion`
   - NO uses `https://tu-proyecto.vercel.app/formulario-certificacion.html`
   - Las URLs limpias son mejores para SEO y UX

3. **Seguridad:**
   - Nunca compartas las URLs de los scripts de Clientify públicamente
   - Los formularios ya incluyen headers de seguridad básicos

4. **Mantenimiento:**
   - Si cambias la estructura HTML, las Arañas pueden dejar de funcionar
   - En ese caso, re-detecta el formulario en Clientify

## 🎯 Próximos Pasos

1. ✅ Desplegar en Vercel
2. ✅ Configurar 6 Arañas en Clientify
3. ✅ Insertar scripts de las Arañas
4. ✅ Probar cada formulario
5. ✅ Verificar que los datos llegan a Clientify
6. 📈 (Opcional) Configurar Google Analytics
7. 🔗 (Opcional) Configurar dominio personalizado en Vercel

---

**¡Listo!** 🎉 Tu proyecto está completamente preparado para desplegar en Vercel y conectar con Clientify.
