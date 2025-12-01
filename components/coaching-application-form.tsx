"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

type ProfileType = "profesional_ventas" | "director_comercial" | "consultor" | "empresario" | "coach" | "otro"

type CoachingLevel = "none" | "received_coaching" | "has_training" | "certified" | "professional"

type EducationLevel = "basica" | "tecnica" | "universitaria" | "postgrado" | "otra"

type FinancingMethod = "company_pays" | "can_afford_with_scholarship" | "need_financing" | "info_only"

interface FormData {
  timestamp: string
  source: string
  profile_type: ProfileType | ""
  contact_data: {
    first_name: string
    last_name: string
    email: string
    whatsapp: string
    country: string
    city: string
    linkedin_url: string
  }
  professional_context: {
    current_position: string
    years_experience: string
    manages_team: boolean | null
    team_size: number
    industry: string
    annual_revenue_range: string
    has_sales_coach_role: boolean | null | "interested"
  }
  coaching_experience: {
    level: CoachingLevel | ""
    accredited_hours: number
    company_has_coach: boolean | null
  }
  education: {
    level: EducationLevel | ""
    other_specify: string
  }
  motivations: {
    obtain_tools: boolean
    improve_leadership: boolean
    get_certified: boolean
    expand_consulting: boolean
    full_career_path: boolean
    join_riccert: boolean
    job_board_access: boolean
    immersion_only: boolean
    has_client_portfolio: boolean
  }
  training_center: {
    is_authorized: boolean
    type: string
  }
  financing: {
    method: FinancingMethod | ""
    additional_comments: string
  }
  test_cirexco: {
    completed: boolean
    will_complete: boolean
  }
  legal_acceptance: {
    read_admission_process: boolean
    understand_real_cases: boolean
    authorize_verification: boolean
    understand_no_guarantee: boolean
  }
}

const mockFormData: FormData = {
  timestamp: "",
  source: "web_organic",
  profile_type: "director_comercial",
  contact_data: {
    first_name: "Carlos",
    last_name: "Martínez",
    email: "carlos.martinez@example.com",
    whatsapp: "+34 612 345 678",
    country: "ES",
    city: "Barcelona",
    linkedin_url: "https://www.linkedin.com/in/carlosmartinez",
  },
  professional_context: {
    current_position: "Director Comercial",
    years_experience: "6-10",
    manages_team: true,
    team_size: 8,
    industry: "Tecnología",
    annual_revenue_range: "500k-1M",
    has_sales_coach_role: "interested",
  },
  coaching_experience: {
    level: "received_coaching",
    accredited_hours: 50,
    company_has_coach: false,
  },
  education: {
    level: "universitaria",
    other_specify: "",
  },
  motivations: {
    obtain_tools: true,
    improve_leadership: true,
    get_certified: true,
    expand_consulting: false,
    full_career_path: true,
    join_riccert: true,
    job_board_access: false,
    immersion_only: false,
    has_client_portfolio: false,
  },
  training_center: {
    is_authorized: false,
    type: "none",
  },
  financing: {
    method: "can_afford_with_scholarship",
    additional_comments: "Me interesa conocer las opciones de beca disponibles",
  },
  test_cirexco: {
    completed: false,
    will_complete: true,
  },
  legal_acceptance: {
    read_admission_process: true,
    understand_real_cases: true,
    authorize_verification: true,
    understand_no_guarantee: true,
  },
}

const TEXTS = {
  estimatedTime: "⏱️ 4-5 minutos para completar",
  step1Title: "¿Cuál describe mejor tu situación?",
  step2Title: "Datos de Contacto",
  step3Title: "Contexto Profesional",
  step4Title: "Experiencia Comercial",
  step5Title: "Experiencia en Coaching",
  step6Title: "Motivaciones e Intereses",
  step7Title: "Verificación y Financiación",
  nextButton: "Siguiente",
  backButton: "Atrás",
  submitButton: "SOLICITAR MI EVALUACIÓN PARA BECA",
  savedMessage: "Datos guardados",
  reinforcement: {
    step1: "¡Perfecto! Tu perfil es ideal para este programa",
    step3: "Excelente experiencia. Solo 4 pasos más",
    step7: "¡Último paso! Tu postulación está casi lista",
  },
  microCopy: {
    revenue: "Esta información nos ayuda a personalizar tu beca",
    linkedin: "Acelera tu proceso de admisión (+25% probabilidad)",
    testCircexco: "Completarlo aumenta tus opciones de beca",
  },
  profileTypes: {
    profesional_ventas: "Profesional de Ventas",
    director_comercial: "Director Comercial",
    consultor: "Consultor",
    empresario: "Empresario",
    coach: "Coach",
    otro: "Otro",
  },
  successMessage: "¡Postulación enviada con éxito!",
  successSubMessage: "Recibirás respuesta del comité en 48-72h hábiles. Hemos enviado una copia a tu email",
  errorMessage: "Hubo un problema. Por favor intenta nuevamente",
}

export default function CoachingApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(mockFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [reinforcementMessage, setReinforcementMessage] = useState("")
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Only load from localStorage on first render
    if (isFirstRender.current) {
      const savedData = localStorage.getItem("coachingFormData")
      if (savedData) {
        try {
          setFormData(JSON.parse(savedData))
        } catch (e) {
          console.error("Error loading saved data:", e)
        }
      }
      isFirstRender.current = false
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Save current form data
      setFormData((currentData) => {
        localStorage.setItem("coachingFormData", JSON.stringify(currentData))
        return currentData
      })
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const updateFormData = (path: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.profile_type !== ""
      case 2:
        return (
          formData.contact_data.first_name !== "" &&
          formData.contact_data.last_name !== "" &&
          validateEmail(formData.contact_data.email) &&
          formData.contact_data.whatsapp !== "" &&
          formData.contact_data.country !== "" &&
          formData.contact_data.city !== ""
        )
      case 3:
      case 4:
        return (
          formData.professional_context.current_position !== "" &&
          formData.professional_context.years_experience !== "" &&
          formData.professional_context.industry !== ""
        )
      case 5:
        return formData.coaching_experience.level !== ""
      case 6:
        return Object.values(formData.motivations).some((v) => v === true)
      case 7:
        return (
          formData.education.level !== "" &&
          formData.financing.method !== "" &&
          formData.legal_acceptance.read_admission_process &&
          formData.legal_acceptance.understand_real_cases &&
          formData.legal_acceptance.authorize_verification &&
          formData.legal_acceptance.understand_no_guarantee
        )
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    if (currentStep === 1) {
      setReinforcementMessage(TEXTS.reinforcement.step1)
      setTimeout(() => setReinforcementMessage(""), 3000)
    } else if (currentStep === 3) {
      setReinforcementMessage(TEXTS.reinforcement.step3)
      setTimeout(() => setReinforcementMessage(""), 3000)
    }

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    }

    if (currentStep === 6) {
      setReinforcementMessage(TEXTS.reinforcement.step7)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(7)) {
      return
    }

    setIsSubmitting(true)
    const finalData = {
      ...formData,
      timestamp: new Date().toISOString(),
    }

    console.log("Form Data to Send:", JSON.stringify(finalData, null, 2))

    try {
      await sendToClientify(finalData)
      setIsSuccess(true)
      localStorage.removeItem("coachingFormData")
    } catch (error) {
      console.error("Submission error:", error)
      setIsError(true)
      localStorage.setItem("coachingFormBackup", JSON.stringify(finalData))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function sendToClientify(formData: FormData) {
    /*
     * TODO: Configure Clientify Integration
     *
     * Steps to complete the integration:
     * 1. Get your Clientify API key from the Clientify dashboard
     * 2. Add CLIENTIFY_API_KEY as an environment variable in Vercel
     * 3. Uncomment the code below and update the endpoint URL if needed
     * 4. Test the integration with a sample submission
     */

    const CLIENTIFY_WEBHOOK_URL = "https://api.clientify.com/v1/contacts/"

    // Simulate API call for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { success: true }

    /* Uncomment when ready to integrate with Clientify:
    try {
      const response = await fetch(CLIENTIFY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLIENTIFY_API_KEY}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error("API request failed")
      }
    } catch (error) {
      console.error("Error sending to CRM:", error)
      throw error
    }
    */
  }

  const ProgressBar = () => {
    const progress = (currentStep / 7) * 100
    const stepTitles = [
      TEXTS.step1Title,
      TEXTS.step2Title,
      TEXTS.step3Title,
      TEXTS.step4Title,
      TEXTS.step5Title,
      TEXTS.step6Title,
      TEXTS.step7Title,
    ]

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Paso {currentStep} de 7 - {stepTitles[currentStep - 1]}
          </span>
          {showSaved && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {TEXTS.savedMessage}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">{TEXTS.successMessage}</CardTitle>
            <CardDescription className="text-lg mt-4">{TEXTS.successSubMessage}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-destructive">{TEXTS.errorMessage}</CardTitle>
            <CardDescription className="mt-4">
              <Button onClick={() => setIsError(false)}>Reintentar</Button>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex justify-center mb-6">
        <Image
          src="/images/logo-20con-20texto-20color-281-29.png"
          alt="Coaching Comercial CIE Barcelona"
          width={600}
          height={120}
          className="h-20 w-auto"
        />
      </div>

      <div className="text-center mb-6">
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          {TEXTS.estimatedTime}
        </p>
      </div>

      <Card>
        <CardHeader>
          <ProgressBar />
        </CardHeader>

        <CardContent>
          {reinforcementMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              {reinforcementMessage}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step1Title}</h2>
              <RadioGroup
                value={formData.profile_type}
                onValueChange={(value) => updateFormData("profile_type", value)}
              >
                {Object.entries(TEXTS.profileTypes).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step2Title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    value={formData.contact_data.first_name}
                    onChange={(e) => updateFormData("contact_data.first_name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    value={formData.contact_data.last_name}
                    onChange={(e) => updateFormData("contact_data.last_name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact_data.email}
                  onChange={(e) => updateFormData("contact_data.email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData.contact_data.whatsapp}
                  onChange={(e) => updateFormData("contact_data.whatsapp", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">País *</Label>
                  <Select
                    value={formData.contact_data.country}
                    onValueChange={(value) => updateFormData("contact_data.country", value)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ES">España</SelectItem>
                      <SelectItem value="MX">México</SelectItem>
                      <SelectItem value="CO">Colombia</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="CL">Chile</SelectItem>
                      <SelectItem value="PE">Perú</SelectItem>
                      <SelectItem value="OTHER">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    value={formData.contact_data.city}
                    onChange={(e) => updateFormData("contact_data.city", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {(currentStep === 3 || currentStep === 4) && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step3Title}</h2>

              <div className="space-y-2">
                <Label htmlFor="position">Cargo Actual *</Label>
                <Input
                  id="position"
                  value={formData.professional_context.current_position}
                  onChange={(e) => updateFormData("professional_context.current_position", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Años de Experiencia *</Label>
                <Select
                  value={formData.professional_context.years_experience}
                  onValueChange={(value) => updateFormData("professional_context.years_experience", value)}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 años</SelectItem>
                    <SelectItem value="3-5">3-5 años</SelectItem>
                    <SelectItem value="6-10">6-10 años</SelectItem>
                    <SelectItem value="11-15">11-15 años</SelectItem>
                    <SelectItem value="15+">Más de 15 años</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industria *</Label>
                <Input
                  id="industry"
                  value={formData.professional_context.industry}
                  onChange={(e) => updateFormData("professional_context.industry", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>¿Gestionas un equipo? *</Label>
                <RadioGroup
                  value={
                    formData.professional_context.manages_team === null
                      ? ""
                      : formData.professional_context.manages_team.toString()
                  }
                  onValueChange={(value) => updateFormData("professional_context.manages_team", value === "true")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="manages-yes" />
                    <Label htmlFor="manages-yes" className="cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="manages-no" />
                    <Label htmlFor="manages-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.professional_context.manages_team && (
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Tamaño del Equipo</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    value={formData.professional_context.team_size}
                    onChange={(e) =>
                      updateFormData("professional_context.team_size", Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="revenue">Rango de Facturación Anual</Label>
                <Select
                  value={formData.professional_context.annual_revenue_range}
                  onValueChange={(value) => updateFormData("professional_context.annual_revenue_range", value)}
                >
                  <SelectTrigger id="revenue">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100k">0-100k</SelectItem>
                    <SelectItem value="100k-500k">100k-500k</SelectItem>
                    <SelectItem value="500k-1M">500k-1M</SelectItem>
                    <SelectItem value="1M-5M">1M-5M</SelectItem>
                    <SelectItem value="5M+">Más de 5M</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">{TEXTS.microCopy.revenue}</p>
              </div>

              <div className="space-y-2">
                <Label>¿Tienes rol de Sales Coach?</Label>
                <RadioGroup
                  value={
                    formData.professional_context.has_sales_coach_role === null
                      ? ""
                      : formData.professional_context.has_sales_coach_role.toString()
                  }
                  onValueChange={(value) => {
                    updateFormData(
                      "professional_context.has_sales_coach_role",
                      value === "interested" ? "interested" : value === "true",
                    )
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="coach-yes" />
                    <Label htmlFor="coach-yes" className="cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="coach-no" />
                    <Label htmlFor="coach-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interested" id="coach-interested" />
                    <Label htmlFor="coach-interested" className="cursor-pointer">
                      Me interesa
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step5Title}</h2>

              <div className="space-y-2">
                <Label>Nivel de Experiencia en Coaching *</Label>
                <RadioGroup
                  value={formData.coaching_experience.level}
                  onValueChange={(value) => updateFormData("coaching_experience.level", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="level-none" />
                    <Label htmlFor="level-none" className="cursor-pointer">
                      Ninguna experiencia
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="received_coaching" id="level-received" />
                    <Label htmlFor="level-received" className="cursor-pointer">
                      He recibido coaching
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="has_training" id="level-training" />
                    <Label htmlFor="level-training" className="cursor-pointer">
                      Tengo formación en coaching
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="certified" id="level-certified" />
                    <Label htmlFor="level-certified" className="cursor-pointer">
                      Estoy certificado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="level-professional" />
                    <Label htmlFor="level-professional" className="cursor-pointer">
                      Soy coach profesional
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {(formData.coaching_experience.level === "certified" ||
                formData.coaching_experience.level === "professional") && (
                <div className="space-y-2">
                  <Label htmlFor="hours">Horas Acreditadas</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.coaching_experience.accredited_hours}
                    onChange={(e) =>
                      updateFormData("coaching_experience.accredited_hours", Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>¿Tu empresa tiene Coach interno?</Label>
                <RadioGroup
                  value={
                    formData.coaching_experience.company_has_coach === null
                      ? ""
                      : formData.coaching_experience.company_has_coach.toString()
                  }
                  onValueChange={(value) => updateFormData("coaching_experience.company_has_coach", value === "true")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="company-coach-yes" />
                    <Label htmlFor="company-coach-yes" className="cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="company-coach-no" />
                    <Label htmlFor="company-coach-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step6Title}</h2>
              <p className="text-muted-foreground">Selecciona todas las que apliquen (mínimo 1)</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="obtain-tools"
                    checked={formData.motivations.obtain_tools}
                    onCheckedChange={(checked) => updateFormData("motivations.obtain_tools", checked)}
                  />
                  <Label htmlFor="obtain-tools" className="cursor-pointer">
                    Obtener herramientas para aplicar en mi trabajo
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="improve-leadership"
                    checked={formData.motivations.improve_leadership}
                    onCheckedChange={(checked) => updateFormData("motivations.improve_leadership", checked)}
                  />
                  <Label htmlFor="improve-leadership" className="cursor-pointer">
                    Mejorar mi liderazgo comercial
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="get-certified"
                    checked={formData.motivations.get_certified}
                    onCheckedChange={(checked) => updateFormData("motivations.get_certified", checked)}
                  />
                  <Label htmlFor="get-certified" className="cursor-pointer">
                    Certificarme como Coach Comercial
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expand-consulting"
                    checked={formData.motivations.expand_consulting}
                    onCheckedChange={(checked) => updateFormData("motivations.expand_consulting", checked)}
                  />
                  <Label htmlFor="expand-consulting" className="cursor-pointer">
                    Ampliar mi oferta de consultoría
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="full-career"
                    checked={formData.motivations.full_career_path}
                    onCheckedChange={(checked) => updateFormData("motivations.full_career_path", checked)}
                  />
                  <Label htmlFor="full-career" className="cursor-pointer">
                    Hacer la carrera completa (Practitioner + Master)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="join-riccert"
                    checked={formData.motivations.join_riccert}
                    onCheckedChange={(checked) => updateFormData("motivations.join_riccert", checked)}
                  />
                  <Label htmlFor="join-riccert" className="cursor-pointer">
                    Unirme a la comunidad RICCERT
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="job-board"
                    checked={formData.motivations.job_board_access}
                    onCheckedChange={(checked) => updateFormData("motivations.job_board_access", checked)}
                  />
                  <Label htmlFor="job-board" className="cursor-pointer">
                    Acceder a la bolsa de trabajo
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="immersion-only"
                    checked={formData.motivations.immersion_only}
                    onCheckedChange={(checked) => updateFormData("motivations.immersion_only", checked)}
                  />
                  <Label htmlFor="immersion-only" className="cursor-pointer">
                    Solo me interesa la inmersión presencial
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="client-portfolio"
                    checked={formData.motivations.has_client_portfolio}
                    onCheckedChange={(checked) => updateFormData("motivations.has_client_portfolio", checked)}
                  />
                  <Label htmlFor="client-portfolio" className="cursor-pointer">
                    Ya tengo cartera de clientes para coaching
                  </Label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{TEXTS.step7Title}</h2>

              <div className="space-y-2">
                <Label htmlFor="education">Nivel Educativo *</Label>
                <Select
                  value={formData.education.level}
                  onValueChange={(value) => updateFormData("education.level", value)}
                >
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basica">Educación Básica</SelectItem>
                    <SelectItem value="tecnica">Técnica</SelectItem>
                    <SelectItem value="universitaria">Universitaria</SelectItem>
                    <SelectItem value="postgrado">Postgrado</SelectItem>
                    <SelectItem value="otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.education.level === "otra" && (
                <div className="space-y-2">
                  <Label htmlFor="education-other">Especifica</Label>
                  <Input
                    id="education-other"
                    value={formData.education.other_specify}
                    onChange={(e) => updateFormData("education.other_specify", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn (Opcional)</Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/in/tu-perfil"
                  value={formData.contact_data.linkedin_url}
                  onChange={(e) => updateFormData("contact_data.linkedin_url", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">{TEXTS.microCopy.linkedin}</p>
              </div>

              <div className="space-y-2">
                <Label>TEST CIREXCO</Label>
                <RadioGroup
                  value={
                    formData.test_cirexco.completed
                      ? "completed"
                      : formData.test_cirexco.will_complete
                        ? "will-complete"
                        : ""
                  }
                  onValueChange={(value) => {
                    updateFormData("test_cirexco.completed", value === "completed")
                    updateFormData("test_cirexco.will_complete", value === "will-complete")
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="test-completed" />
                    <Label htmlFor="test-completed" className="cursor-pointer">
                      Ya lo completé
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="will-complete" id="test-will" />
                    <Label htmlFor="test-will" className="cursor-pointer">
                      Lo completaré
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="test-no" />
                    <Label htmlFor="test-no" className="cursor-pointer">
                      No me interesa
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-muted-foreground">{TEXTS.microCopy.testCircexco}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="financing">Método de Financiación *</Label>
                <Select
                  value={formData.financing.method}
                  onValueChange={(value) => updateFormData("financing.method", value)}
                >
                  <SelectTrigger id="financing">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company_pays">Mi empresa lo paga</SelectItem>
                    <SelectItem value="can_afford_with_scholarship">Puedo permitírmelo con beca</SelectItem>
                    <SelectItem value="need_financing">Necesito financiación</SelectItem>
                    <SelectItem value="info_only">Solo busco información</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios Adicionales</Label>
                <Textarea
                  id="comments"
                  placeholder="Comparte cualquier información adicional que consideres relevante..."
                  value={formData.financing.additional_comments}
                  onChange={(e) => updateFormData("financing.additional_comments", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Aceptaciones Legales *</h3>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="legal-1"
                    checked={formData.legal_acceptance.read_admission_process}
                    onCheckedChange={(checked) => updateFormData("legal_acceptance.read_admission_process", checked)}
                  />
                  <Label htmlFor="legal-1" className="cursor-pointer leading-relaxed">
                    He leído y comprendo el proceso de admisión
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="legal-2"
                    checked={formData.legal_acceptance.understand_real_cases}
                    onCheckedChange={(checked) => updateFormData("legal_acceptance.understand_real_cases", checked)}
                  />
                  <Label htmlFor="legal-2" className="cursor-pointer leading-relaxed">
                    Entiendo que trabajaré con casos reales
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="legal-3"
                    checked={formData.legal_acceptance.authorize_verification}
                    onCheckedChange={(checked) => updateFormData("legal_acceptance.authorize_verification", checked)}
                  />
                  <Label htmlFor="legal-3" className="cursor-pointer leading-relaxed">
                    Autorizo la verificación de mi información
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="legal-4"
                    checked={formData.legal_acceptance.understand_no_guarantee}
                    onCheckedChange={(checked) => updateFormData("legal_acceptance.understand_no_guarantee", checked)}
                  />
                  <Label htmlFor="legal-4" className="cursor-pointer leading-relaxed">
                    Entiendo que no hay garantía de admisión
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {TEXTS.backButton}
              </Button>
            )}

            {currentStep < 7 && (
              <Button type="button" onClick={handleNext} disabled={!validateStep(currentStep)} className="ml-auto">
                {TEXTS.nextButton}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {currentStep === 7 && (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!validateStep(7) || isSubmitting}
                className="ml-auto bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {TEXTS.submitButton}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
