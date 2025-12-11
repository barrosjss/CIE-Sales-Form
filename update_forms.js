
const fs = require('fs');
const path = require('path');

const filePath = './index.html';

function getNewFields(formType) {
    return `
            <!-- Campos Adicionales -->
            <div class="space-y-4">
              <div class="space-y-2">
                <label for="program_source_${formType}" class="block text-sm font-medium text-gray-700">He conocido del programa a través de:</label>
                <select id="program_source_${formType}" name="program_source"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecciona una opción</option>
                  <option value="internet">1 Internet</option>
                  <option value="redes_sociales">2 Redes Sociales</option>
                  <option value="recomendacion">3 Recomendación</option>
                  <option value="miembro_cie">4 Soy empresario miembro CIE Barcelona</option>
                </select>
              </div>

              <div class="flex items-start space-x-2">
                <input type="checkbox" id="legal_privacy_${formType}" name="legal_privacy" class="mt-1">
                <label for="legal_privacy_${formType}" class="text-sm leading-relaxed text-gray-700 cursor-pointer">
                  * CIE Barcelona gestiona sus datos únicamente con fines académicos y de promoción económica. Su información no será traspasada a terceros.
                </label>
              </div>
            </div>`;
}

function getCertificacionExtra() {
    return `
            <div class="space-y-2"><label class="block text-sm font-medium text-gray-700">Personal de ventas a su cargo</label><input
                type="text" name="sales_position" class="w-full px-3 py-2 border border-gray-300 rounded-md"></div>

            <div class="space-y-2"><label class="block text-sm font-medium text-gray-700">Experiencia en coaching</label><input
                type="text" name="coaching_experience" class="w-full px-3 py-2 border border-gray-300 rounded-md"></div>`;
}

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to find forms
    const formPattern = /(<form id="form-([^"]+)"[^>]*>)([\s\S]*?)(<\/form>)/g;

    const newContent = content.replace(formPattern, (match, formTag, formType, formContent, formClose) => {
        console.log(`Processing form: ${formType}`);

        // Skip if already has program_source
        if (formContent.includes('name="program_source"')) {
            console.log(`Skipping ${formType}, already has program_source`);
            return match;
        }

        // For Certificacion, add extra fields after motivations
        if (formType === 'certificacion') {
            if (formContent.includes('name="motivations"')) {
                const motivationsPattern = /(name="motivations"[^>]*><\/textarea><\/div>)/;
                formContent = formContent.replace(motivationsPattern, '$1' + getCertificacionExtra());
            }
        }

        // Add common fields after subject
        const subjectPattern = /(name="subject"[^>]*><\/textarea><\/div>)/;
        if (subjectPattern.test(formContent)) {
            formContent = formContent.replace(subjectPattern, '$1' + getNewFields(formType));
        } else {
            console.log(`Warning: Subject field not found in ${formType}`);
        }

        return `${formTag}${formContent}${formClose}`;
    });

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Done!');

} catch (err) {
    console.error('Error:', err);
}
