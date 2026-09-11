import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  Fragment,
} from "react"

const F = {
  shell: "#354A5E",
  brand: "#0070F2",
  brandHover: "#0854A0",
  pageBg: "#F5F6F7",
  card: "#FFFFFF",
  text1: "#32363A",
  text2: "#6A6D70",
  text3: "#89919A",
  border: "#D9D9D9",
  success: "#107E3E",
  successBg: "#F1FDF6",
  warning: "#E9730C",
  warningBg: "#FEF7F1",
  error: "#BB0000",
  errorBg: "#FFEBEB",
  infoBg: "#EBF5FB",
  highlight: "#EBF5FB",
}

type ToastType = "success" | "error" | "info" | "warning"
interface ToastItem {
  id: number
  msg: string
  type: ToastType
}
const ToastCtx = createContext<(msg: string, type?: ToastType) => void>(
  () => {},
)
const useToast = () => useContext(ToastCtx)

function getTimeGreeting() {
  const hour = new Date().getHours()
  if (hour >= 4 && hour < 12) {
    return { text: "Good morning", icon: "☀️" }
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon", icon: "🌤️" }
  } else {
    return { text: "Good evening", icon: "🌙" }
  }
}

function LiveClock() {
  const [timeStr, setTimeStr] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      const ampm = hours >= 12 ? "pm" : "am"
      hours = hours % 12
      hours = hours ? hours : 12
      const formattedHours = String(hours).padStart(2, "0")
      setTimeStr(`${formattedHours}:${minutes}:${seconds} ${ampm}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeStr) return null

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#FFFFFF",
        color: "#0F172A",
        padding: "5px 14px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 700,
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.4)",
        letterSpacing: "0.02em",
        marginRight: 4,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#0070F2",
          boxShadow: "0 0 0 3px rgba(0, 112, 242, 0.2)",
          display: "inline-block",
        }}
      />
      <span>{timeStr}</span>
    </div>
  )
}


type Persona = "org_admin" | "product_admin" | "employee"
type EmpStatus = "Active" | "Inactive" | "On Leave" | "Incomplete"
type OrgStatus = "Active" | "Draft" | "Inactive" | "Suspended"
type PayrunStatus = "Draft" | "Calculated" | "Under Review" | "Approved" | "Completed"

interface Employee {
  id: string
  name: string
  email: string
  department: string
  designation: string
  doj: string
  empType: "Full-Time" | "Part-Time" | "Contract"
  manager: string
  location: string
  mobile?: string
  status: EmpStatus
  salaryStructure: string
  grossSalary: number
}
interface SalaryStructure {
  id: string
  name: string
  basic: number
  hra: number
  fixedAllowance: number
  specialAllowance: number
  gross: number
}
interface PayrunInputRow {
  empId: string
  empName: string
  department: string
  grossSalary: number
  bonus: number
  incentive: number
  lopDays: number
  lopDeduction: number
  otherDeduction: number
  pf: number
  esi: number
  tds: number
  profTax: number
  totalEarnings: number
  totalDeductions: number
  netSalary: number
}
interface Payrun {
  id: string
  period: string
  month: number
  year: number
  status: PayrunStatus
  totalEmployees: number
  grossPayroll: number
  totalDeductions: number
  netPayroll: number
  generatedBy: string
  generatedOn: string
  rows: PayrunInputRow[]
}
interface AuditLog {
  id: string
  user: string
  org: string
  action: string
  module: string
  oldValue: string
  newValue: string
  timestamp: string
}
interface Organization {
  id: string
  name: string
  code: string
  legalName: string
  country: string
  currency: string
  financialYear: string
  status: OrgStatus
  employees: number
  admin: string
}

const INIT_SS: SalaryStructure[] = [
  {
    id: "SS-001",
    name: "Senior Engineer",
    basic: 60000,
    hra: 24000,
    fixedAllowance: 12000,
    specialAllowance: 14000,
    gross: 110000,
  },
  {
    id: "SS-002",
    name: "Junior Engineer",
    basic: 30000,
    hra: 12000,
    fixedAllowance: 6000,
    specialAllowance: 7000,
    gross: 55000,
  },
  {
    id: "SS-003",
    name: "Manager",
    basic: 80000,
    hra: 32000,
    fixedAllowance: 16000,
    specialAllowance: 22000,
    gross: 150000,
  },
  {
    id: "SS-004",
    name: "Associate",
    basic: 20000,
    hra: 8000,
    fixedAllowance: 4000,
    specialAllowance: 3000,
    gross: 35000,
  },
  {
    id: "SS-005",
    name: "Director",
    basic: 150000,
    hra: 60000,
    fixedAllowance: 30000,
    specialAllowance: 50000,
    gross: 290000,
  },
]

const INIT_EMPS: Employee[] = [
  {
    id: "EMP-001",
    name: "Priya Nair",
    email: "priya.nair@globaltech.in",
    department: "Engineering",
    designation: "Senior Software Engineer",
    doj: "2021-03-15",
    empType: "Full-Time",
    manager: "Rajesh Kumar",
    location: "Bangalore",
    mobile: "+91 98765 43210",
    status: "Active",
    salaryStructure: "Senior Engineer",
    grossSalary: 110000,
  },
  {
    id: "EMP-002",
    name: "Arjun Sharma",
    email: "arjun.sharma@globaltech.in",
    department: "Engineering",
    designation: "Junior Software Engineer",
    doj: "2023-06-01",
    empType: "Full-Time",
    manager: "Priya Nair",
    location: "Bangalore",
    status: "Active",
    salaryStructure: "Junior Engineer",
    grossSalary: 55000,
  },
  {
    id: "EMP-003",
    name: "Meena Iyer",
    email: "meena.iyer@globaltech.in",
    department: "HR",
    designation: "HR Manager",
    doj: "2020-01-10",
    empType: "Full-Time",
    manager: "Rajesh Kumar",
    location: "Mumbai",
    status: "Active",
    salaryStructure: "Manager",
    grossSalary: 150000,
  },
  {
    id: "EMP-004",
    name: "Suresh Pillai",
    email: "suresh.pillai@globaltech.in",
    department: "Finance",
    designation: "Finance Associate",
    doj: "2022-09-20",
    empType: "Full-Time",
    manager: "Meena Iyer",
    location: "Hyderabad",
    status: "Active",
    salaryStructure: "Associate",
    grossSalary: 35000,
  },
  {
    id: "EMP-005",
    name: "Anita Desai",
    email: "anita.desai@globaltech.in",
    department: "Sales",
    designation: "Sales Manager",
    doj: "2019-07-01",
    empType: "Full-Time",
    manager: "Rajesh Kumar",
    location: "Delhi",
    status: "Active",
    salaryStructure: "Manager",
    grossSalary: 150000,
  },
  {
    id: "EMP-006",
    name: "Vikram Reddy",
    email: "vikram.reddy@globaltech.in",
    department: "Engineering",
    designation: "Senior Software Engineer",
    doj: "2020-11-15",
    empType: "Full-Time",
    manager: "Priya Nair",
    location: "Bangalore",
    status: "On Leave",
    salaryStructure: "Senior Engineer",
    grossSalary: 110000,
  },
  {
    id: "EMP-007",
    name: "Kavitha Rao",
    email: "kavitha.rao@globaltech.in",
    department: "Design",
    designation: "Senior Designer",
    doj: "2022-02-28",
    empType: "Full-Time",
    manager: "Anita Desai",
    location: "Bangalore",
    status: "Active",
    salaryStructure: "Senior Engineer",
    grossSalary: 110000,
  },
  {
    id: "EMP-008",
    name: "Rahul Mehta",
    email: "rahul.mehta@globaltech.in",
    department: "Engineering",
    designation: "Junior Software Engineer",
    doj: "2024-01-08",
    empType: "Contract",
    manager: "Priya Nair",
    location: "Remote",
    status: "Active",
    salaryStructure: "Junior Engineer",
    grossSalary: 55000,
  },
  {
    id: "EMP-009",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@globaltech.in",
    department: "Management",
    designation: "Director - Technology",
    doj: "2018-04-01",
    empType: "Full-Time",
    manager: "-",
    location: "Mumbai",
    status: "Active",
    salaryStructure: "Director",
    grossSalary: 290000,
  },
  {
    id: "EMP-010",
    name: "abc - abc",
    email: "abc@naxrita.in",
    department: "AI/ML",
    designation: "Packaged App Development Associate",
    doj: "2026-09-01",
    empType: "Full-Time",
    manager: "Meena Iyer",
    location: "Bangalore",
    status: "Incomplete",
    salaryStructure: "Junior Engineer",
    grossSalary: 0,
  },
  {
    id: "EMP-011",
    name: "cde - 123",
    email: "cde@naxrita.in",
    department: "AI/ML",
    designation: "Packaged App Development Associate",
    doj: "2026-09-01",
    empType: "Full-Time",
    manager: "Meena Iyer",
    location: "Bangalore",
    status: "Incomplete",
    salaryStructure: "Junior Engineer",
    grossSalary: 0,
  },
]

function calcRows(
  emps: Employee[],
  ss: SalaryStructure[],
  bonus: Record<string, number> = {},
  lop: Record<string, number> = {},
): PayrunInputRow[] {
  return emps.map((e) => {
    const s = ss.find((x) => x.name === e.salaryStructure)!
    const lopDays = lop[e.id] ?? 0
    const lopDeduction = Math.round((e.grossSalary / 26) * lopDays)
    const bonusAmt = bonus[e.id] ?? 0
    const pf = Math.round(s.basic * 0.12)
    const esi = e.grossSalary <= 21000 ? Math.round(e.grossSalary * 0.0075) : 0
    const tds = Math.round(e.grossSalary * 0.1)
    const profTax = e.grossSalary > 15000 ? 200 : 150
    const totalEarnings = e.grossSalary + bonusAmt - lopDeduction
    const totalDeductions = pf + esi + tds + profTax
    return {
      empId: e.id,
      empName: e.name,
      department: e.department,
      grossSalary: e.grossSalary,
      bonus: bonusAmt,
      incentive: 0,
      lopDays,
      lopDeduction,
      otherDeduction: 0,
      pf,
      esi,
      tds,
      profTax,
      totalEarnings,
      totalDeductions,
      netSalary: totalEarnings - totalDeductions,
    }
  })
}

const INIT_PAYRUNS: Payrun[] = [
  {
    id: "PR-2026-07",
    period: "July 2026",
    month: 7,
    year: 2026,
    status: "Completed",
    totalEmployees: 9,
    grossPayroll: 1065000,
    totalDeductions: 148500,
    netPayroll: 916500,
    generatedBy: "Meena Iyer",
    generatedOn: "2026-07-28",
    rows: calcRows(INIT_EMPS, INIT_SS, { "EMP-001": 10000, "EMP-005": 15000 }, {
      "EMP-006": 2,
    }),
  },
  {
    id: "PR-2026-08",
    period: "August 2026",
    month: 8,
    year: 2026,
    status: "Under Review",
    totalEmployees: 9,
    grossPayroll: 1070000,
    totalDeductions: 149200,
    netPayroll: 920800,
    generatedBy: "Meena Iyer",
    generatedOn: "2026-08-28",
    rows: calcRows(INIT_EMPS, INIT_SS, { "EMP-003": 5000 }, { "EMP-006": 1 }),
  },
  {
    id: "PR-2026-06",
    period: "June 2026",
    month: 6,
    year: 2026,
    status: "Completed",
    totalEmployees: 8,
    grossPayroll: 955000,
    totalDeductions: 133700,
    netPayroll: 821300,
    generatedBy: "Meena Iyer",
    generatedOn: "2026-06-27",
    rows: calcRows(INIT_EMPS, INIT_SS),
  },
]

const INIT_ORGS: Organization[] = [
  {
    id: "ORG-001",
    name: "Naxrita Solutions Pvt. Ltd.",
    code: "GTS",
    legalName: "Naxrita Solutions Private Limited",
    country: "India",
    currency: "INR",
    financialYear: "April-March",
    status: "Active",
    employees: 9,
    admin: "Meena Iyer",
  },
  {
    id: "ORG-002",
    name: "NovaSoft Technologies",
    code: "NST",
    legalName: "NovaSoft Technologies Pvt. Ltd.",
    country: "India",
    currency: "INR",
    financialYear: "April-March",
    status: "Active",
    employees: 24,
    admin: "Rohan Gupta",
  },
  {
    id: "ORG-003",
    name: "BrightEdge Consulting",
    code: "BEC",
    legalName: "BrightEdge Consulting LLP",
    country: "India",
    currency: "INR",
    financialYear: "Jan-Dec",
    status: "Draft",
    employees: 0,
    admin: "-",
  },
]

const INIT_AUDIT: AuditLog[] = [
  {
    id: "AL-001",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Payroll Approved",
    module: "Payroll",
    oldValue: "Under Review",
    newValue: "Approved",
    timestamp: "2026-08-29 10:42:15",
  },
  {
    id: "AL-002",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Employee Updated",
    module: "Employees",
    oldValue: "Status: Active",
    newValue: "Status: On Leave",
    timestamp: "2026-08-27 14:18:33",
  },
  {
    id: "AL-003",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Salary Structure Changed",
    module: "Salary",
    oldValue: "Gross: 95000",
    newValue: "Gross: 110000",
    timestamp: "2026-08-20 09:05:11",
  },
  {
    id: "AL-004",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Payroll Generated",
    module: "Payroll",
    oldValue: "Draft",
    newValue: "Calculated",
    timestamp: "2026-08-28 17:30:00",
  },
  {
    id: "AL-005",
    user: "Rajesh Kumar",
    org: "Naxrita Solutions",
    action: "Access Role Changed",
    module: "Access",
    oldValue: "Role: Associate",
    newValue: "Role: Manager",
    timestamp: "2026-08-15 11:22:44",
  },
  {
    id: "AL-006",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Employee Created",
    module: "Employees",
    oldValue: "-",
    newValue: "EMP-008: Rahul Mehta",
    timestamp: "2026-08-08 08:55:02",
  },
  {
    id: "AL-007",
    user: "Product Admin",
    org: "Naxrita Solutions",
    action: "Payroll Completed",
    module: "Payroll",
    oldValue: "Approved",
    newValue: "Completed",
    timestamp: "2026-07-31 18:00:00",
  },
  {
    id: "AL-008",
    user: "Meena Iyer",
    org: "Naxrita Solutions",
    action: "Payslip Generated",
    module: "Payslips",
    oldValue: "-",
    newValue: "9 payslips Jul 2026",
    timestamp: "2026-07-31 18:05:30",
  },
]

const inr = (n: number) => "₹" + n.toLocaleString("en-IN")
const fmtD = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
const PAYRUN_STEPS: PayrunStatus[] = [
  "Draft",
  "Calculated",
  "Under Review",
  "Approved",
  "Completed",
]

function Badge({
  label,
  color,
  bg,
  dot,
}: {
  label: string
  color: string
  bg: string
  dot?: string
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 600,
        color,
        background: bg,
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dot,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  )
}
function empBadge(s: EmpStatus) {
  const m: Record<EmpStatus, [string, string, string]> = {
    Active: [F.success, F.successBg, F.success],
    Inactive: [F.text3, F.pageBg, F.text3],
    "On Leave": [F.warning, F.warningBg, F.warning],
    Incomplete: [F.warning, F.warningBg, F.warning],
  }
  const [c, b, d] = m[s]
  return <Badge label={s} color={c} bg={b} dot={d} />
}
function prBadge(s: PayrunStatus) {
  const m: Record<PayrunStatus, [string, string, string]> = {
    Draft: [F.text3, F.pageBg, F.text3],
    Calculated: [F.brand, F.infoBg, F.brand],
    "Under Review": [F.warning, F.warningBg, F.warning],
    Approved: ["#0854A0", "#D6E8FB", "#0854A0"],
    Completed: [F.success, F.successBg, F.success],
  }
  const [c, b, d] = m[s]
  return <Badge label={s} color={c} bg={b} dot={d} />
}
function orgBadge(s: OrgStatus) {
  const m: Record<OrgStatus, [string, string]> = {
    Active: [F.success, F.successBg],
    Draft: [F.text3, F.pageBg],
    Inactive: [F.warning, F.warningBg],
    Suspended: [F.error, F.errorBg],
  }
  const [c, b] = m[s]
  return <Badge label={s} color={c} bg={b} />
}
function capBadge(v: string) {
  if (v === "Yes")
    return <Badge label="Yes" color={F.success} bg={F.successBg} />
  if (v === "No") return <Badge label="No" color={F.error} bg={F.errorBg} />
  if (v === "-") return <span style={{ color: F.text3, fontSize: 13 }}>-</span>
  return <Badge label={v} color={F.warning} bg={F.warningBg} />
}

function Tile({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: string
}) {
  return (
    <div
      style={{
        background: F.card,
        border: `1px solid ${F.border}`,
        borderRadius: 4,
        padding: "18px 22px",
        borderLeft: accent ? `3px solid ${accent}` : undefined,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: F.text2,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{ fontSize: 24, fontWeight: 800, color: F.text1, lineHeight: 1 }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: F.text2, marginTop: 6 }}>{sub}</div>
      )}
    </div>
  )
}

const iSt: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  border: `1px solid ${F.border}`,
  borderRadius: 4,
  fontSize: 13,
  color: F.text1,
  background: F.card,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
}

function Fld({ label, children }: { label: string children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: F.text2 }}>
        {label}
      </label>
      {children}
    </div>
  )
}
function Th({
  children,
  right,
}: {
  children: React.ReactNode
  right?: boolean
}) {
  return (
    <th
      style={{
        padding: "9px 14px",
        textAlign: right ? "right" : "left",
        fontSize: 11,
        fontWeight: 600,
        color: F.text2,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        borderBottom: `1px solid ${F.border}`,
        whiteSpace: "nowrap",
        background: F.pageBg,
      }}
    >
      {children}
    </th>
  )
}
function Td({
  children,
  right,
  mono,
  style,
}: {
  children: React.ReactNode
  right?: boolean
  mono?: boolean
  style?: React.CSSProperties
}) {
  return (
    <td
      style={{
        padding: "11px 14px",
        textAlign: right ? "right" : "left",
        fontSize: 13,
        color: F.text1,
        verticalAlign: "middle",
        fontFamily: mono ? "'JetBrains Mono',monospace" : undefined,
        ...style,
      }}
    >
      {children}
    </td>
  )
}
function TrH({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  const [h, setH] = useState(false)
  return (
    <tr
      style={{
        borderBottom: `1px solid ${F.border}`,
        background: h ? F.highlight : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.1s",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}
function PH({
  title,
  sub,
  action,
}: {
  title: string
  sub?: string
  action?: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
      }}
    >
      <div>
        <h1
          style={{ margin: 0, fontSize: 19, fontWeight: 700, color: F.text1 }}
        >
          {title}
        </h1>
        {sub && (
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            {sub}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

type BtnVariant = "primary" | "secondary" | "danger" | "ghost" | "success"
function Btn({
  children,
  variant = "primary",
  onClick,
  small,
  disabled,
}: {
  children: React.ReactNode
  variant?: BtnVariant
  onClick?: () => void
  small?: boolean
  disabled?: boolean
}) {
  const [hov, setHov] = useState(false)
  const base: Record<BtnVariant, React.CSSProperties> = {
    primary: {
      background: hov ? F.brandHover : F.brand,
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: hov ? F.highlight : F.card,
      color: F.text1,
      border: `1px solid ${F.border}`,
    },
    danger: {
      background: F.errorBg,
      color: F.error,
      border: "1px solid #e8b4b4",
    },
    ghost: { background: "transparent", color: F.brand, border: "none" },
    success: {
      background: hov ? "#0d6b34" : F.success,
      color: "#fff",
      border: "none",
    },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...base[variant],
        padding: small ? "5px 12px" : "8px 16px",
        borderRadius: 4,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "inherit",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  )
}

function TabBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: { id: string label: string }[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: `2px solid ${F.border}`,
        marginBottom: 16,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          style={{
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: active === t.id ? 600 : 400,
            color: active === t.id ? F.brand : F.text2,
            background: "transparent",
            border: "none",
            borderBottom: `2px solid ${
              active === t.id ? F.brand : "transparent"
            }`,
            cursor: "pointer",
            marginBottom: -2,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function SH({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: F.text3,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 14,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  )
}
function IR({ label, value }: { label: string value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: `1px solid ${F.border}`,
      }}
    >
      <span style={{ fontSize: 12, color: F.text2 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: F.text1 }}>
        {value}
      </span>
    </div>
  )
}

// ── SAP F4 Value Help ─────────────────────────────────────────────────────────
function ValueHelp({
  value,
  onChange,
  placeholder,
  values,
  label,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  values: string[]
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState("")
  // Track whether the mouse is anywhere inside the dropdown.
  // This prevents the main input's onBlur from closing the panel
  // when the user clicks the inner search or hovers over items.
  const dropRef = useState(false)
  const dropHover = dropRef[0]
  const setDropHover = dropRef[1]

  const close = () => {
    setOpen(false)
    setInner("")
  }

  const filtered = values.filter(
    (v) => !inner || v.toLowerCase().includes(inner.toLowerCase()),
  )

  return (
    <div style={{ position: "relative", flex: 1 }}>
      {label && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: F.text2,
            marginBottom: 3,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </div>
      )}
      <div style={{ position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: 9,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? F.brand : F.text3}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setOpen(true)
            setInner("")
          }}
          onBlur={() => {
            if (!dropHover) close()
          }}
          placeholder={placeholder ?? "Search…"}
          style={{
            ...iSt,
            paddingLeft: 30,
            paddingRight: value ? 28 : 10,
            border: `1px solid ${open ? F.brand : F.border}`,
            boxShadow: open ? `0 0 0 2px ${F.brand}22` : undefined,
            transition: "border 0.12s, box-shadow 0.12s",
          }}
        />
        {value && (
          <button
            onMouseDown={(e) => {
              e.preventDefault()
              onChange("")
              close()
            }}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: F.text3,
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        )}
      </div>

      {open && (
        <div
          onMouseEnter={() => setDropHover(true)}
          onMouseLeave={() => setDropHover(false)}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            minWidth: 260,
            background: F.card,
            border: `1px solid ${F.brand}`,
            borderRadius: 6,
            zIndex: 400,
            boxShadow: "0 8px 28px rgba(0,0,0,0.16)",
            overflow: "hidden",
          }}
        >
          {/* Inner search — no autoFocus; stays open because dropHover is true */}
          <div
            style={{
              padding: "8px 10px",
              borderBottom: `1px solid ${F.border}`,
              background: F.pageBg,
            }}
          >
            <div style={{ position: "relative" }}>
              <svg
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke={F.text3}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={inner}
                onChange={(e) => setInner(e.target.value)}
                onBlur={() => {
                  if (!dropHover) close()
                }}
                placeholder="Search available values…"
                style={{ ...iSt, paddingLeft: 26, fontSize: 12 }}
              />
            </div>
          </div>

          <div style={{ maxHeight: 240, overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div
                style={{
                  padding: "16px 14px",
                  fontSize: 13,
                  color: F.text3,
                  textAlign: "center",
                }}
              >
                No results for "{inner}"
              </div>
            )}
            {filtered.map((v) => (
              <div
                key={v}
                // onMouseDown with preventDefault keeps focus on the currently-focused
                // input (main or inner) so the blur/close cycle never triggers.
                onMouseDown={(e) => {
                  e.preventDefault()
                  onChange(v)
                  close()
                }}
                style={{
                  padding: "9px 14px",
                  fontSize: 13,
                  color: v === value ? F.brand : F.text1,
                  background: v === value ? F.infoBg : "transparent",
                  cursor: "pointer",
                  fontWeight: v === value ? 600 : 400,
                  borderBottom: `1px solid ${F.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background 0.08s",
                }}
              >
                <span>{v}</span>
                {v === value && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={F.brand}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "5px 12px",
              borderTop: `1px solid ${F.border}`,
              fontSize: 11,
              color: F.text3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: F.pageBg,
            }}
          >
            <span>F4 Value Help</span>
            <span>
              {filtered.length} of {values.length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function SlidePanel({
  title,
  sub,
  children,
  onClose,
  footer,
}: {
  title: string
  sub?: string
  children: React.ReactNode
  onClose: () => void
  footer?: React.ReactNode
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(50,54,58,0.35)",
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 440,
          height: "100%",
          background: F.card,
          borderLeft: `1px solid ${F.border}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${F.border}`,
            background: F.pageBg,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: F.text1 }}>
              {title}
            </div>
            {sub && (
              <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                {sub}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: `1px solid ${F.border}`,
              borderRadius: 4,
              cursor: "pointer",
              padding: "4px 8px",
              color: F.text2,
              fontSize: 14,
            }}
          >
            X
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {children}
        </div>
        {footer && (
          <div
            style={{ padding: "12px 20px", borderTop: `1px solid ${F.border}` }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(50,54,58,0.45)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: F.card,
          borderRadius: 4,
          width: wide ? 740 : 580,
          maxHeight: "92vh",
          overflow: "auto",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            padding: "14px 22px",
            borderBottom: `1px solid ${F.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: F.pageBg,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: F.text1 }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: `1px solid ${F.border}`,
              borderRadius: 4,
              cursor: "pointer",
              padding: "4px 8px",
              color: F.text2,
            }}
          >
            X
          </button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  )
}

function Stepper({ current }: { current: PayrunStatus }) {
  const ci = PAYRUN_STEPS.indexOf(current)
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      {PAYRUN_STEPS.map((step, i) => {
        const done = i < ci
        const active = i === ci
        return (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < PAYRUN_STEPS.length - 1 ? 1 : undefined,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: done ? F.success : active ? F.brand : F.border,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done ? (
                  <span style={{ color: "#fff", fontSize: 13 }}>v</span>
                ) : (
                  <span
                    style={{
                      color: active ? "#fff" : F.text3,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: active ? F.brand : done ? F.success : F.text3,
                  fontWeight: active ? 700 : 500,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
            {i < PAYRUN_STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? F.success : F.border,
                  margin: "0 6px",
                  marginBottom: 18,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Confirm({
  msg,
  onOk,
  onCancel,
  okLabel = "Confirm",
  danger,
}: {
  msg: string
  onOk: () => void
  onCancel: () => void
  okLabel?: string
  danger?: boolean
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(50,54,58,0.5)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: F.card,
          borderRadius: 4,
          padding: 24,
          width: 360,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            margin: "0 0 20px",
            fontSize: 14,
            color: F.text1,
            lineHeight: 1.6,
          }}
        >
          {msg}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Btn variant="secondary" onClick={onCancel}>
            Cancel
          </Btn>
          <Btn variant={danger ? "danger" : "primary"} onClick={onOk}>
            {okLabel}
          </Btn>
        </div>
      </div>
    </div>
  )
}

function Toasts({ toasts }: { toasts: ToastItem[] }) {
  const colors: Record<ToastType, [string, string]> = {
    success: [F.success, F.successBg],
    error: [F.error, F.errorBg],
    info: [F.brand, F.infoBg],
    warning: [F.warning, F.warningBg],
  }
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {toasts.map((t) => {
        const [color, bg] = colors[t.type]
        return (
          <div
            key={t.id}
            style={{
              background: bg,
              border: `1px solid ${color}40`,
              borderLeft: `3px solid ${color}`,
              borderRadius: 4,
              padding: "10px 16px",
              fontSize: 13,
              color: F.text1,
              fontWeight: 500,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              minWidth: 240,
              maxWidth: 340,
            }}
          >
            {t.msg}
          </div>
        )
      })}
    </div>
  )
}

function MiniBarChart({
  data,
  color,
}: {
  data: { label: string value: number }[]
  color: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}
    >
      {data.map((d) => (
        <div
          key={d.label}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: "2px 2px 0 0",
              background: color,
              opacity: 0.85,
              height: `${(d.value / max) * 52}px`,
              minHeight: 3,
              transition: "height 0.3s",
            }}
          />
          <span style={{ fontSize: 9, color: F.text3, whiteSpace: "nowrap" }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function DonutChart({
  segments,
  size = 80,
}: {
  segments: { label: string value: number color: string }[]
  size?: number
}) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  let cum = 0
  const paths = segments.map((seg) => {
    const pct = seg.value / total
    const start = cum
    cum += pct
    const s = start * Math.PI * 2 - Math.PI / 2
    const e = cum * Math.PI * 2 - Math.PI / 2
    const r = size / 2 - 6
    const cx = size / 2
    const cy = size / 2
    const x1 = cx + r * Math.cos(s)
    const y1 = cy + r * Math.sin(s)
    const x2 = cx + r * Math.cos(e)
    const y2 = cy + r * Math.sin(e)
    const large = pct > 0.5 ? 1 : 0
    return {
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
      color: seg.color,
      label: seg.label,
      pct: Math.round(pct * 100),
    }
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} opacity={0.88}>
          <title>
            {p.label}: {p.pct}%
          </title>
        </path>
      ))}
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 16} fill={F.card} />
    </svg>
  )
}

function TrendArrow({ up }: { up: boolean }) {
  return (
    <span
      style={{
        color: up ? F.success : F.error,
        fontSize: 11,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <polyline points={up ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
      {up ? "+" : "−"}
    </span>
  )
}

// ── Enterprise Dashboard Charts ───────────────────────────────────────────────

// Proper ring donut with center label
function RingChart({
  segments,
  size = 140,
  centerLabel,
  centerSub,
}: {
  segments: { label: string value: number color: string }[]
  size?: number
  centerLabel?: string
  centerSub?: string
}) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0)
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: F.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: F.text3,
        }}
      >
        No data
      </div>
    )
  const R = size / 2,
    r = R * 0.58,
    cx = R,
    cy = R
  const GAP = 0.012 // radians gap between segments
  let cum = 0
  const paths = segments.map((seg) => {
    const pct = seg.value / total
    const start = cum + GAP / 2
    cum += pct
    const end = cum * Math.PI * 2 - Math.PI / 2
    const s = start * Math.PI * 2 - Math.PI / 2
    const x1 = cx + (R - 3) * Math.cos(s)
    const y1 = cy + (R - 3) * Math.sin(s)
    const x2 = cx + (R - 3) * Math.cos(end)
    const y2 = cy + (R - 3) * Math.sin(end)
    const x3 = cx + r * Math.cos(end)
    const y3 = cy + r * Math.sin(end)
    const x4 = cx + r * Math.cos(s)
    const y4 = cy + r * Math.sin(s)
    const large = pct > 0.5 ? 1 : 0
    return {
      d: `M ${x1} ${y1} A ${R - 3} ${R - 3} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`,
      color: seg.color,
      label: seg.label,
      pct: Math.round(pct * 100),
    }
  })
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ flexShrink: 0 }}
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} opacity={0.92}>
          <title>
            {p.label}: {p.pct}%
          </title>
        </path>
      ))}
      {centerLabel && (
        <>
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={F.text1}
            fontFamily="Inter,sans-serif"
          >
            {centerLabel}
          </text>
          {centerSub && (
            <text
              x={cx}
              y={cy + 13}
              textAnchor="middle"
              fontSize="9"
              fill={F.text3}
              fontFamily="Inter,sans-serif"
            >
              {centerSub}
            </text>
          )}
        </>
      )}
    </svg>
  )
}

// Multi-series grouped bar chart (SVG)
function GroupedBarChart({ months, cur }: { months: Payrun[] cur: Payrun }) {
  const W = 560,
    H = 180,
    PAD = { l: 54, r: 16, t: 20, b: 48 }
  const chartW = W - PAD.l - PAD.r,
    chartH = H - PAD.t - PAD.b
  const maxVal =
    Math.max(...months.flatMap((p) => [p.grossPayroll, p.netPayroll])) * 1.12 ||
    1

  // Y-axis grid ticks
  const ticks = 4
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => i / ticks)

  const barGroupW = chartW / months.length
  const barW = barGroupW * 0.3
  const gap = barGroupW * 0.06

  const yPos = (v: number) => PAD.t + chartH * (1 - v / maxVal)

  const fmtK = (v: number) =>
    v >= 100000
      ? `₹${(v / 100000).toFixed(1)}L`
      : v >= 1000
        ? `₹${Math.round(v / 1000)}K`
        : String(v)

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* Grid lines */}
      {yTicks.map((t, i) => {
        const y = PAD.t + chartH * (1 - t)
        return (
          <g key={i}>
            <line
              x1={PAD.l}
              y1={y}
              x2={W - PAD.r}
              y2={y}
              stroke={F.border}
              strokeDasharray={t === 0 ? "none" : "4 3"}
              strokeWidth={t === 0 ? 1.5 : 0.8}
            />
            <text
              x={PAD.l - 6}
              y={y + 4}
              textAnchor="end"
              fontSize="9"
              fill={F.text3}
              fontFamily="Inter,sans-serif"
            >
              {fmtK(maxVal * t)}
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {months.map((p, i) => {
        const gx = PAD.l + i * barGroupW + barGroupW * 0.1
        const isCur = p.id === cur.id
        const gh = Math.max(2, chartH * (p.grossPayroll / maxVal))
        const nh = Math.max(2, chartH * (p.netPayroll / maxVal))
        const dh = Math.max(2, chartH * (p.totalDeductions / maxVal))
        const gy = yPos(p.grossPayroll)
        const ny = yPos(p.netPayroll)
        const dy = yPos(p.totalDeductions)
        const cx = gx + barGroupW * 0.4
        return (
          <g key={p.id}>
            {/* Gross bar */}
            <rect
              x={gx}
              y={gy}
              width={barW}
              height={gh}
              rx={2}
              fill={isCur ? F.warning : `${F.warning}55`}
            >
              <title>
                {p.period} Gross: {inr(p.grossPayroll)}
              </title>
            </rect>
            {/* Net bar */}
            <rect
              x={gx + barW + gap}
              y={ny}
              width={barW}
              height={nh}
              rx={2}
              fill={isCur ? F.success : `${F.success}55`}
            >
              <title>
                {p.period} Net: {inr(p.netPayroll)}
              </title>
            </rect>
            {/* Deduction bar */}
            <rect
              x={gx + barW * 2 + gap * 2}
              y={dy}
              width={barW}
              height={dh}
              rx={2}
              fill={isCur ? F.error : `${F.error}44`}
            >
              <title>
                {p.period} Deductions: {inr(p.totalDeductions)}
              </title>
            </rect>
            {/* Month label */}
            <text
              x={cx}
              y={H - PAD.b + 14}
              textAnchor="middle"
              fontSize="10"
              fill={isCur ? F.brand : F.text2}
              fontWeight={isCur ? "700" : "500"}
              fontFamily="Inter,sans-serif"
            >
              {p.period.slice(0, 3)}
            </text>
            <text
              x={cx}
              y={H - PAD.b + 24}
              textAnchor="middle"
              fontSize="9"
              fill={F.text3}
              fontFamily="Inter,sans-serif"
            >
              {"'" + p.year.toString().slice(2)}
            </text>
            {isCur && (
              <rect
                x={gx - 2}
                y={PAD.t}
                width={barGroupW * 0.8}
                height={chartH}
                rx={3}
                fill={`${F.brand}06`}
              />
            )}
          </g>
        )
      })}

      {/* Net payroll trend line */}
      {(() => {
        const pts = months.map((p, i) => {
          const gx = PAD.l + i * barGroupW + barGroupW * 0.1 + barW + gap / 2
          return [gx, yPos(p.netPayroll) - 4]
        })
        if (pts.length < 2) return null
        const d = "M " + pts.map((p) => p.join(" ")).join(" L ")
        return (
          <>
            <polyline
              points={pts.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke={F.brand}
              strokeWidth="1.5"
              strokeDasharray="5 3"
              opacity="0.5"
            />
            {pts.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={months[i].id === cur.id ? F.brand : F.card}
                stroke={F.brand}
                strokeWidth="1.5"
              />
            ))}
          </>
        )
      })()}
    </svg>
  )
}

// Sparkline SVG
function Sparkline({
  data,
  color,
  up,
}: {
  data: number[]
  color: string
  up: boolean
}) {
  if (data.length < 2) return null
  const W = 60,
    H = 24
  const min = Math.min(...data),
    max = Math.max(...data),
    range = max - min || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * (H - 4) - 2,
  ])
  const d = "M " + pts.map((p) => p.join(" ")).join(" L ")
  const area = `M ${pts[0][0]} ${H} L ${pts.map((p) => p.join(" ")).join(" L ")} L ${pts[pts.length - 1][0]} ${H} Z`
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <path d={area} fill={`${color}18`} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.5"
        fill={color}
      />
    </svg>
  )
}

function DashboardView({
  emps,
  payruns,
  ss,
  onNav,
}: {
  emps: Employee[]
  ss: SalaryStructure[]
  payruns: Payrun[]
  onNav: (v: string) => void
}) {
  const toast = useToast()
  const months = payruns
    .slice()
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
  const cur = months[months.length - 1] ?? payruns[0]
  const prev = months[months.length - 2]
  const activeCount = emps.filter((e) => e.status === "Active").length
  const onLeave = emps.filter((e) => e.status === "On Leave").length
  const depts = [...new Set(emps.map((e) => e.department))]
  const DEPT_COLORS = [
    "#0070F2",
    "#107E3E",
    "#E9730C",
    "#8A5CF6",
    "#00ACC1",
    "#E91E63",
    "#FF9800",
  ]

  const netChange = prev
    ? ((cur.netPayroll - prev.netPayroll) / prev.netPayroll) * 100
    : 0
  const grossChange = prev
    ? ((cur.grossPayroll - prev.grossPayroll) / prev.grossPayroll) * 100
    : 0

  const totalDed = cur.rows.reduce((s, r) => s + r.totalDeductions, 0)
  const totalPF = cur.rows.reduce((s, r) => s + r.pf, 0)
  const totalTDS = cur.rows.reduce((s, r) => s + r.tds, 0)
  const totalPT = cur.rows.reduce((s, r) => s + r.profTax, 0)
  const totalESI = cur.rows.reduce((s, r) => s + r.esi, 0)

  const empTypeSegs = [
    {
      label: "Full-Time",
      value: emps.filter((e) => e.empType === "Full-Time").length,
      color: F.brand,
    },
    {
      label: "Contract",
      value: emps.filter((e) => e.empType === "Contract").length,
      color: F.warning,
    },
    {
      label: "Part-Time",
      value: emps.filter((e) => e.empType === "Part-Time").length,
      color: "#8A5CF6",
    },
  ].filter((x) => x.value > 0)

  const statusSegs = [
    { label: "Active", value: activeCount, color: F.success },
    { label: "On Leave", value: onLeave, color: F.warning },
    {
      label: "Inactive",
      value: emps.filter((e) => e.status === "Inactive").length,
      color: F.text3,
    },
  ].filter((x) => x.value > 0)

  // Activity feed (recent audit-style events)
  const activityFeed = [
    {
      icon: "payroll",
      label: "Payroll Generated",
      detail: `${cur.period} · ${cur.totalEmployees} employees`,
      time: "Today, 09:14 AM",
      color: F.brand,
      status: "info",
    },
    {
      icon: "approve",
      label: "Payrun Submitted for Review",
      detail: `${cur.period} payroll · By ${cur.generatedBy}`,
      time: "Today, 09:10 AM",
      color: F.warning,
      status: "warning",
    },
    {
      icon: "employee",
      label: "New Employee Onboarded",
      detail: "Rahul Mehta · Engineering · Bangalore",
      time: "Yesterday",
      color: F.success,
      status: "success",
    },
    {
      icon: "tax",
      label: "TDS Challan Generated",
      detail: `Form 24Q · ${inr(cur.rows.reduce((s, r) => s + r.tds, 0))} · Aug 2026`,
      time: "28 Aug",
      color: "#8A5CF6",
      status: "info",
    },
    {
      icon: "pf",
      label: "PF Contribution Filed",
      detail: `EPFO · ${inr(cur.rows.reduce((s, r) => s + r.pf, 0))} · Due 15 Sep`,
      time: "28 Aug",
      color: F.success,
      status: "success",
    },
    {
      icon: "warning",
      label: "Salary Revision Pending",
      detail: "3 employees due for appraisal review",
      time: "25 Aug",
      color: F.warning,
      status: "warning",
    },
  ]

  // Salary bands
  const bands = [
    { l: "<₹50K", min: 0, max: 50000 },
    { l: "₹50K–₹1L", min: 50000, max: 100000 },
    { l: "₹1L–₹2L", min: 100000, max: 200000 },
    { l: ">₹2L", min: 200000, max: Infinity },
  ]
  const bandData = bands.map((b) => ({
    label: b.l,
    count: emps.filter((e) => e.grossSalary >= b.min && e.grossSalary < b.max)
      .length,
  }))

  // Sparkline data (net payroll across periods)
  const sparkNets = months.map((m) => m.netPayroll)
  const sparkEmps = months.map((m) => m.totalEmployees)

  // Department payroll share
  const deptRows = depts
    .map((d, i) => {
      const net = cur.rows
        .filter((r) => r.department === d)
        .reduce((s, r) => s + r.netSalary, 0)
      const count = cur.rows.filter((r) => r.department === d).length
      const pct = Math.round((net / cur.netPayroll) * 100)
      return { d, net, count, pct, color: DEPT_COLORS[i % DEPT_COLORS.length] }
    })
    .sort((a, b) => b.net - a.net)

  // Time-based greeting calculation
  const { text: greeting, icon: greetingIcon } = getTimeGreeting()
  const adminName = "Meena Iyer"

  const CardIcon = ({
    color,
    children,
  }: {
    color: string
    children: React.ReactNode
  }) => (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ── Time-wise Greeting Header ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 10,
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 18 }}>
              {greeting === "Good morning"
                ? "☀️"
                : greeting === "Good afternoon"
                  ? "🌤️"
                  : "🌙"}
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: F.text1,
                letterSpacing: "-0.3px",
              }}
            >
              {greeting}, {adminName}
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: F.text2 }}>
            Naxrita Solutions Pvt. Ltd. · {cur.period} ·{" "}
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn
            variant="secondary"
            onClick={() => toast("Dashboard exported", "success")}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </Btn>
          <Btn onClick={() => onNav("payruns")}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Run Payroll
          </Btn>
        </div>
      </div>

      {/* ── Section Divider Label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2,
          marginBottom: -4,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: F.text1,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Payroll & Workforce Analytics
        </div>
        <div style={{ fontSize: 12, color: F.text3 }}>
          Real-time metrics for {cur.period}
        </div>
      </div>

      {/* ── Row 1: 5 KPI tiles ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 12,
        }}
      >
        {([
          {
            label: "Total Employees",
            value: String(emps.length),
            sub: `${activeCount} active · ${onLeave} on leave`,
            up: true,
            accent: F.brand,
            spark: sparkEmps,
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={F.brand}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ),
          },
          {
            label: "Gross Payroll",
            value: inr(cur.grossPayroll),
            sub: `${
              grossChange >= 0 ? "+" : ""
            }${grossChange.toFixed(1)}% vs ${prev?.period.slice(0, 3) ?? "prev"}`,
            up: grossChange >= 0,
            accent: F.warning,
            spark: months.map((m) => m.grossPayroll),
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={F.warning}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
          },
          {
            label: "Net Payroll",
            value: inr(cur.netPayroll),
            sub: `${
              netChange >= 0 ? "+" : ""
            }${netChange.toFixed(1)}% vs ${prev?.period.slice(0, 3) ?? "prev"}`,
            up: netChange >= 0,
            accent: F.success,
            spark: sparkNets,
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={F.success}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            ),
          },
          {
            label: "Total Deductions",
            value: inr(totalDed),
            sub: `PF ${inr(totalPF)} · TDS ${inr(totalTDS)}`,
            up: false,
            accent: "#8A5CF6",
            spark: months.map((m) => m.totalDeductions),
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8A5CF6"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
          },
          {
            label: "Payroll Health",
            value: "98.2%",
            sub: "Compliance score · Aug",
            up: true,
            accent: F.success,
            spark: [94, 96, 97, 97, 98, 98, 98],
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={F.success}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ),
          },
        ] as {
          label: string
          value: string
          sub: string
          up: boolean
          accent: string
          spark: number[]
          icon: React.ReactNode
        }[]).map((k) => (
          <div
            key={k.label}
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 10,
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <CardIcon color={k.accent}>{k.icon}</CardIcon>
              <Sparkline data={k.spark} color={k.accent} up={k.up} />
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: F.text3,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: 6,
              }}
            >
              {k.label}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: F.text1,
                letterSpacing: "-0.5px",
                marginBottom: 6,
              }}
            >
              {k.value}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
              }}
            >
              <TrendArrow up={k.up} />
              <span style={{ color: F.text3 }}>{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Multi-series bar chart + Current pay run ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}
      >
        {/* Grouped bar chart */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "22px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: F.text1 }}>
                Payroll Trend
              </div>
              <div style={{ fontSize: 12, color: F.text3, marginTop: 2 }}>
                Gross · Net · Deductions across {months.length} pay cycles
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {[
                { l: "Gross", c: F.warning },
                { l: "Net", c: F.success },
                { l: "Deductions", c: F.error },
                { l: "Net Trend", c: F.brand, dash: true },
              ].map((x) => (
                <div
                  key={x.l}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <svg width="18" height="6">
                    <rect
                      x="0"
                      y="1"
                      width="18"
                      height="4"
                      rx="2"
                      fill={x.dash ? "none" : x.c}
                      stroke={x.dash ? x.c : "none"}
                      strokeWidth={x.dash ? 1.5 : 0}
                      strokeDasharray={x.dash ? "5 3" : "none"}
                    />
                  </svg>
                  <span style={{ fontSize: 11, color: F.text2 }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
          <GroupedBarChart months={months} cur={cur} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 14,
              paddingTop: 12,
              borderTop: `1px solid ${F.border}`,
            }}
          >
            {[
              {
                l: "Avg Net",
                v: inr(
                  Math.round(
                    months.reduce((s, m) => s + m.netPayroll, 0) /
                      months.length,
                  ),
                ),
              },
              {
                l: "Peak Month",
                v:
                  months
                    .reduce((a, b) => (a.netPayroll > b.netPayroll ? a : b))
                    .period.slice(0, 3) +
                  " '" +
                  months
                    .reduce((a, b) => (a.netPayroll > b.netPayroll ? a : b))
                    .year.toString()
                    .slice(2),
              },
              {
                l: "YTD Gross",
                v: inr(months.reduce((s, m) => s + m.grossPayroll, 0)),
              },
            ].map((x) => (
              <div key={x.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: F.text3,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  {x.l}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                  {x.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current pay run status card */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: F.text1 }}>
                Current Pay Run
              </div>
              <div style={{ fontSize: 12, color: F.text3, marginTop: 2 }}>
                {cur.period}
              </div>
            </div>
            {prBadge(cur.status)}
          </div>
          <Stepper current={cur.status} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {([
              ["Gross Payroll", cur.grossPayroll, F.warning],
              ["Total Deductions", cur.totalDeductions, F.error],
              ["Net Payroll", cur.netPayroll, F.success],
            ] as [string, number, string][]).map(([l, v, c]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: F.pageBg,
                  borderRadius: 6,
                  borderLeft: `3px solid ${c}`,
                }}
              >
                <span style={{ fontSize: 12, color: F.text2 }}>{l}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: F.text1 }}>
                  {inr(v)}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "10px 0",
              borderTop: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: F.text3,
            }}
          >
            <span>Generated by</span>
            <span style={{ fontWeight: 600, color: F.text1 }}>
              {cur.generatedBy}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={() => onNav("payruns")}>Review</Btn>
            <Btn
              variant="secondary"
              onClick={() => toast("Pay run exported", "success")}
            >
              Export
            </Btn>
          </div>
        </div>
      </div>

      {/* ── Row 3: Dept breakdown + Two ring charts ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}
      >
        {/* Department payroll heat bars */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: F.text1,
              marginBottom: 3,
            }}
          >
            Payroll by Department
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginBottom: 16 }}>
            Net pay share · {cur.period}
          </div>
          {deptRows.map((x) => (
            <div key={x.d} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: x.color,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ fontSize: 12, fontWeight: 500, color: F.text1 }}
                  >
                    {x.d}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: F.text3 }}>
                    {x.count} emp
                  </span>
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: F.text1 }}
                  >
                    {x.pct}%
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: x.color,
                      width: 76,
                      textAlign: "right",
                    }}
                  >
                    {inr(x.net)}
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: F.border,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${x.pct}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(90deg,${x.color}99,${x.color})`,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Deduction breakdown ring */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: F.text1,
              marginBottom: 3,
            }}
          >
            Deduction Split
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginBottom: 16 }}>
            Total: {inr(totalDed)} · {cur.period}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <RingChart
              segments={[
                { label: "PF", value: totalPF, color: "#8A5CF6" },
                { label: "TDS", value: totalTDS, color: F.error },
                { label: "Prof Tax", value: totalPT, color: F.warning },
                { label: "ESI", value: totalESI, color: F.brand },
              ].filter((x) => x.value > 0)}
              size={120}
              centerLabel={inr(totalDed).replace("₹", "")}
              centerSub="Total"
            />
            <div style={{ flex: 1 }}>
              {[
                { l: "Prov. Fund", v: totalPF, c: "#8A5CF6" },
                { l: "Income Tax", v: totalTDS, c: F.error },
                { l: "Prof. Tax", v: totalPT, c: F.warning },
                { l: "ESI", v: totalESI, c: F.brand },
              ].map(({ l, v, c }) => {
                const pct = totalDed > 0 ? Math.round((v / totalDed) * 100) : 0
                return (
                  <div key={l} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 11,
                          color: F.text2,
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: 2,
                            background: c,
                            display: "inline-block",
                          }}
                        />
                        {l}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: F.text1,
                        }}
                      >
                        {inr(v)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        background: F.border,
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          borderRadius: 2,
                          background: c,
                          opacity: 0.8,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Workforce composition ring */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: F.text1,
              marginBottom: 3,
            }}
          >
            Workforce Composition
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginBottom: 16 }}>
            {emps.length} employees total
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <RingChart
              segments={empTypeSegs}
              size={120}
              centerLabel={String(emps.length)}
              centerSub="Employees"
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                ...empTypeSegs,
                ...statusSegs.filter((s) => s.label !== "Active"),
              ].map((x) => (
                <div
                  key={x.label}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: x.color,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 11, color: F.text2, flex: 1 }}>
                    {x.label}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 800, color: F.text1 }}
                  >
                    {x.value}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: F.text3,
                      width: 26,
                      textAlign: "right",
                    }}
                  >
                    {Math.round((x.value / emps.length) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 4: Activity feed + Salary distribution + Compliance ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}
      >
        {/* Payroll Activity Feed */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: F.text1 }}>
                Activity &amp; Alerts
              </div>
              <div style={{ fontSize: 12, color: F.text3, marginTop: 2 }}>
                Recent payroll events
              </div>
            </div>
            <span
              style={{
                padding: "2px 10px",
                background: F.warningBg,
                border: `1px solid ${F.warning}40`,
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 700,
                color: F.warning,
              }}
            >
              1 Pending
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {activityFeed.map((a, i) => {
              const iconSvg: Record<string, React.ReactNode> = {
                payroll: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                approve: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ),
                employee: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                tax: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                ),
                pf: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                warning: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ),
              }
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    paddingBottom: i < activityFeed.length - 1 ? 12 : 0,
                    marginBottom: i < activityFeed.length - 1 ? 12 : 0,
                    borderBottom:
                      i < activityFeed.length - 1
                        ? `1px solid ${F.border}`
                        : "none",
                  }}
                >
                  {/* Timeline dot + line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: `${a.color}15`,
                        border: `1.5px solid ${a.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: a.color,
                        flexShrink: 0,
                      }}
                    >
                      {iconSvg[a.icon]}
                    </div>
                    {i < activityFeed.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          background: F.border,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: F.text1,
                          lineHeight: 1.3,
                        }}
                      >
                        {a.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: F.text3,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {a.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: F.text3,
                        marginTop: 2,
                        lineHeight: 1.4,
                      }}
                    >
                      {a.detail}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Salary distribution */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: F.text1,
              marginBottom: 3,
            }}
          >
            Salary Distribution
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginBottom: 16 }}>
            Headcount by gross salary band
          </div>
          {(() => {
            const maxCount = Math.max(...bandData.map((b) => b.count), 1)
            const BCOLS = ["#8A5CF6", F.brand, F.warning, F.success]
            return bandData.map((b, i) => (
              <div key={b.label} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: F.text1, fontWeight: 500 }}
                  >
                    {b.label}
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: 11, color: F.text3 }}>
                      {b.count} emp
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: BCOLS[i],
                        width: 28,
                        textAlign: "right",
                      }}
                    >
                      {emps.length > 0
                        ? Math.round((b.count / emps.length) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 22,
                    borderRadius: 4,
                    background: F.pageBg,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 4,
                      background: `linear-gradient(90deg,${BCOLS[i]}55,${BCOLS[i]})`,
                      width: `${Math.max((b.count / maxCount) * 100, b.count > 0 ? 8 : 0)}%`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 6,
                      transition: "width 0.4s ease",
                    }}
                  >
                    {b.count > 0 && (
                      <span
                        style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}
                      >
                        {b.count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          })()}
        </div>

        {/* Compliance & Statutory health */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: F.text1,
              marginBottom: 3,
            }}
          >
            Compliance Health
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginBottom: 16 }}>
            Statutory filing status · {cur.period}
          </div>
          {([
            { l: "PF Filed", v: inr(totalPF), ok: true, note: "Due: 15 Sep" },
            {
              l: "ESI Filed",
              v: totalESI > 0 ? inr(totalESI) : "N/A (>₹21K avg)",
              ok: true,
              note: "All compliant",
            },
            {
              l: "TDS Filed",
              v: inr(totalTDS),
              ok: true,
              note: "Form 24Q pending",
            },
            {
              l: "Prof Tax",
              v: inr(totalPT),
              ok: true,
              note: "Challan generated",
            },
            {
              l: "Payslips",
              v: `${cur.totalEmployees} issued`,
              ok: cur.status === "Completed",
              note:
                cur.status === "Completed"
                  ? "All distributed"
                  : "Pending approval",
            },
          ] as { l: string v: string ok: boolean note: string }[]).map((x) => (
            <div
              key={x.l}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "9px 0",
                borderBottom: `1px solid ${F.border}`,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: x.ok ? F.successBg : F.errorBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {x.ok ? (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={F.success}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={F.error}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: F.text1 }}
                  >
                    {x.l}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: x.ok ? F.success : F.error,
                    }}
                  >
                    {x.v}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                  {x.note}
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              background: F.successBg,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={F.success}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: F.success }}>
              All statutory compliances up to date
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmployeeDetailPage({
  emp,
  ss,
  emps,
  setEmps,
  onBack,
}: {
  emp: Employee
  ss: SalaryStructure[]
  emps: Employee[]
  setEmps: React.Dispatch<React.SetStateAction<Employee[]>>
  onBack: () => void
}) {
  const toast = useToast()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Employee>({ ...emp })
  const [confirm, setConfirm] = useState<{
    msg: string
    onOk: () => void
  } | null>(null)
  const s = ss.find((x) => x.name === emp.salaryStructure)
  const pf = s ? Math.round(s.basic * 0.12) : 0
  const tds = Math.round(emp.grossSalary * 0.1)
  const pt = emp.grossSalary > 15000 ? 200 : 150
  const net = emp.grossSalary - pf - tds - pt

  const save = () => {
    const updated = {
      ...draft,
      grossSalary:
        ss.find((x) => x.name === draft.salaryStructure)?.gross ??
        draft.grossSalary,
    }
    setEmps(emps.map((e) => (e.id === emp.id ? updated : e)))
    setEditing(false)
    toast("Employee details saved", "success")
    onBack() // go back to list with fresh data
  }

  const toggleStatus = () => {
    const next: EmpStatus = emp.status === "Active" ? "Inactive" : "Active"
    setConfirm({
      msg: `Set ${emp.name} to ${next}?`,
      onOk: () => {
        setEmps(emps.map((e) => (e.id === emp.id ? { ...e, status: next } : e)))
        toast(`Status updated to ${next}`, "success")
        setConfirm(null)
        onBack()
      },
    })
  }

  const initials = emp.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <div>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          fontSize: 13,
          color: F.text2,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: F.brand,
            fontWeight: 600,
            fontSize: 13,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Employees
        </button>
        <span style={{ color: F.border }}>/</span>
        <span style={{ color: F.text1, fontWeight: 600 }}>{emp.name}</span>
      </div>

      {/* Hero card */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 10,
          marginBottom: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${F.shell} 0%, #2a3a4e 100%)`,
            padding: "28px 28px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: F.brand,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              flexShrink: 0,
              border: "3px solid rgba(255,255,255,0.25)",
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              {emp.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                marginBottom: 10,
              }}
            >
              {emp.designation} · {emp.department} · {emp.id}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {empBadge(emp.status)}
              <Badge
                label={emp.empType}
                color={F.brand}
                bg="rgba(0,112,242,0.25)"
              />
              <Badge
                label={emp.location}
                color="rgba(255,255,255,0.7)"
                bg="rgba(255,255,255,0.12)"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {!editing ? (
              <>
                <Btn
                  onClick={() => {
                    setDraft({ ...emp })
                    setEditing(true)
                  }}
                >
                  Edit Details
                </Btn>
                <Btn
                  variant={emp.status === "Active" ? "danger" : "success"}
                  onClick={toggleStatus}
                >
                  {emp.status === "Active" ? "Deactivate" : "Activate"}
                </Btn>
              </>
            ) : (
              <>
                <Btn variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Btn>
                <Btn variant="success" onClick={save}>
                  Save Changes
                </Btn>
              </>
            )}
          </div>
        </div>
        {/* Salary KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: `1px solid ${F.border}`,
          }}
        >
          {[
            { l: "Gross Monthly", v: inr(emp.grossSalary), c: F.warning },
            { l: "Net Take-Home", v: inr(net), c: F.success },
            { l: "Total Deductions", v: inr(pf + tds + pt), c: F.error },
            { l: "Annual CTC", v: inr(emp.grossSalary * 12), c: "#8A5CF6" },
          ].map((x, i) => (
            <div
              key={x.l}
              style={{
                padding: "16px 22px",
                borderRight: i < 3 ? `1px solid ${F.border}` : "none",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: F.text3,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: 6,
                }}
              >
                {x.l}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: x.c }}>
                {x.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column detail grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Personal & Employment */}
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              borderBottom: `1px solid ${F.border}`,
              fontSize: 13,
              fontWeight: 700,
              color: F.text1,
            }}
          >
            Personal &amp; Employment
          </div>
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {editing ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <Fld label="Full Name">
                  <input
                    style={iSt}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </Fld>
                <Fld label="Email">
                  <input
                    style={iSt}
                    value={draft.email}
                    onChange={(e) =>
                      setDraft({ ...draft, email: e.target.value })
                    }
                  />
                </Fld>
                <Fld label="Department">
                  <select
                    style={iSt}
                    value={draft.department}
                    onChange={(e) =>
                      setDraft({ ...draft, department: e.target.value })
                    }
                  >
                    {[
                      "Engineering",
                      "HR",
                      "Finance",
                      "Sales",
                      "Design",
                      "Management",
                      "Operations",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Fld>
                <Fld label="Designation">
                  <input
                    style={iSt}
                    value={draft.designation}
                    onChange={(e) =>
                      setDraft({ ...draft, designation: e.target.value })
                    }
                  />
                </Fld>
                <Fld label="Work Location">
                  <input
                    style={iSt}
                    value={draft.location}
                    onChange={(e) =>
                      setDraft({ ...draft, location: e.target.value })
                    }
                  />
                </Fld>
                <Fld label="Employment Type">
                  <select
                    style={iSt}
                    value={draft.empType}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        empType: e.target.value as Employee["empType"],
                      })
                    }
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                  </select>
                </Fld>
                <Fld label="Reporting Manager">
                  <select
                    style={iSt}
                    value={draft.manager}
                    onChange={(e) =>
                      setDraft({ ...draft, manager: e.target.value })
                    }
                  >
                    <option value="">— none —</option>
                    {emps
                      .filter((x) => x.id !== emp.id)
                      .map((x) => (
                        <option key={x.id}>{x.name}</option>
                      ))}
                  </select>
                </Fld>
                <Fld label="Status">
                  <select
                    style={iSt}
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        status: e.target.value as EmpStatus,
                      })
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>On Leave</option>
                  </select>
                </Fld>
              </div>
            ) : (
              [
                ["Email", emp.email],
                ["Department", emp.department],
                ["Designation", emp.designation],
                ["Reporting Manager", emp.manager || "—"],
                ["Date of Joining", fmtD(emp.doj)],
                ["Work Location", emp.location],
                ["Employment Type", emp.empType],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px solid ${F.border}`,
                  }}
                >
                  <span style={{ fontSize: 12, color: F.text2 }}>{l}</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: F.text1,
                      textAlign: "right",
                      maxWidth: "60%",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Salary Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${F.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                Salary Structure
              </span>
              {editing && (
                <select
                  style={{ ...iSt, width: 200 }}
                  value={draft.salaryStructure}
                  onChange={(e) =>
                    setDraft({ ...draft, salaryStructure: e.target.value })
                  }
                >
                  {ss.map((x) => (
                    <option key={x.id}>{x.name}</option>
                  ))}
                </select>
              )}
              {!editing && (
                <span style={{ fontSize: 12, fontWeight: 600, color: F.brand }}>
                  {emp.salaryStructure}
                </span>
              )}
            </div>
            {s && (
              <div style={{ padding: "12px 20px" }}>
                {([
                  ["Basic", s.basic, F.brand],
                  ["HRA", s.hra, F.success],
                  ["Fixed Allowance", s.fixedAllowance, F.warning],
                  ["Special Allowance", s.specialAllowance, "#8A5CF6"],
                ] as [string, number, string][]).map(([l, v, c]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 0",
                      borderBottom: `1px solid ${F.border}`,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 12,
                        color: F.text2,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: c,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {l}
                    </span>
                    <span
                      style={{ fontWeight: 700, color: F.text1, fontSize: 13 }}
                    >
                      {inr(v)}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    fontSize: 14,
                    fontWeight: 800,
                    color: F.success,
                  }}
                >
                  <span>Monthly Gross</span>
                  <span>{inr(s.gross)}</span>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${F.border}`,
                fontSize: 13,
                fontWeight: 700,
                color: F.text1,
              }}
            >
              Deductions (Monthly)
            </div>
            <div style={{ padding: "12px 20px" }}>
              {([
                ["Provident Fund (12% Basic)", pf, "#8A5CF6"],
                ["TDS / Income Tax (10%)", tds, F.error],
                ["Professional Tax", pt, F.warning],
              ] as [string, number, string][]).map(([l, v, c]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: `1px solid ${F.border}`,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      color: F.text2,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: c,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {l}
                  </span>
                  <span style={{ fontWeight: 700, color: c, fontSize: 13 }}>
                    {inr(v)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 800,
                  color: F.success,
                }}
              >
                <span>Net Take-Home</span>
                <span>{inr(net)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirm && (
        <Confirm
          msg={confirm.msg}
          onOk={confirm.onOk}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}

// ── Add Employee Wizard Page (Zoho Payroll Style 4-Step Process) ────────────────
function AddEmployeeWizardPage({
  ss,
  emps,
  setEmps,
  onBack,
}: {
  ss: SalaryStructure[]
  emps: Employee[]
  setEmps: React.Dispatch<React.SetStateAction<Employee[]>>
  onBack: () => void
}) {
  const toast = useToast()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  // Form State
  // Step 1: Basic Details
  const [basic, setBasic] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    empId: `EMP-${String(emps.length + 1).padStart(3, "0")}`,
    doj: new Date().toISOString().slice(0, 10),
    email: "",
    mobile: "",
    isDirector: false,
    gender: "Male",
    workLocation: "Head Office ( Swamy Ayyapa... )",
    designation: "Packaged App Development Associate",
    department: "AI/ML",
    enablePortalAccess: true,
  })

  // Step 2: Salary Details
  const [statutory, setStatutory] = useState({
    epf: false,
    esi: false,
    pt: true,
    lwf: false,
  })
  const [annualCTC, setAnnualCTC] = useState<number>(600000)
  const [basicPct, setBasicPct] = useState<number>(50)

  // Step 3: Personal Details
  const [personal, setPersonal] = useState({
    dob: "",
    age: "",
    fatherName: "",
    pan: "",
    differentlyAbled: "None",
    personalEmail: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "Karnataka",
    pincode: "",
  })

  // Step 4: Payment Information
  const [paymentMethod, setPaymentMethod] =
    useState<"direct_deposit" | "bank_transfer" | "cheque" | "cash">(
      "bank_transfer",
    )

  // Calculations for Salary
  const monthlyCTC = Math.round(annualCTC / 12)
  const monthlyBasic = Math.round((monthlyCTC * basicPct) / 100)
  const annualBasic = monthlyBasic * 12
  const monthlyFixed = Math.max(0, monthlyCTC - monthlyBasic)
  const annualFixed = monthlyFixed * 12

  const handleNextStep1 = () => {
    if (!basic.firstName.trim() || !basic.email.trim()) {
      toast("First Name and Work Email are required.", "error")
      return
    }
    setStep(2)
  }

  const handleNextStep2 = () => {
    setStep(3)
  }

  const handleNextStep3 = () => {
    setStep(4)
  }

  const handleFinish = () => {
    const fullName = `${basic.firstName} ${
      basic.middleName ? basic.middleName + " " : ""
    }${basic.lastName}`.trim()
    const newEmp: Employee = {
      id: basic.empId,
      name: fullName || "New Employee",
      email: basic.email,
      department: basic.department,
      designation: basic.designation,
      doj: basic.doj,
      empType: "Full-Time",
      manager: "Meena Iyer",
      location: basic.workLocation.split(" ")[0] || "Bangalore",
      salaryStructure: "Standard Engineer",
      status: "Active",
      grossSalary: monthlyCTC,
    }

    setEmps([newEmp, ...emps])
    toast(`Employee ${fullName} created successfully!`, "success")
    onBack()
  }

  const handleSaveDraft = () => {
    const fullName = `${basic.firstName} ${
      basic.middleName ? basic.middleName + " " : ""
    }${basic.lastName}`.trim()
    const newEmp: Employee = {
      id: basic.empId,
      name: fullName || "New Employee",
      email: basic.email || "pending@naxrita.in",
      department: basic.department,
      designation: basic.designation,
      doj: basic.doj,
      empType: "Full-Time",
      manager: "Meena Iyer",
      location: basic.workLocation.split(" ")[0] || "Bangalore",
      salaryStructure: "Junior Engineer",
      status: "Incomplete",
      grossSalary: 0,
    }
    setEmps([newEmp, ...emps])
    toast(
      `Draft saved for ${fullName || "new employee"}. Profile marked as incomplete.`,
      "warning",
    )
    onBack()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top Navigation / Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: F.text2,
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Employees
          </button>
        </div>
      </div>

      {/* Stepper Wizard Header */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 10,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2
          style={{ margin: 0, fontSize: 20, fontWeight: 700, color: F.text1 }}
        >
          Add Employee
        </h2>

        {/* Step Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 4,
          }}
        >
          {[
            { num: 1, label: "Basic Details" },
            { num: 2, label: "Salary Details" },
            { num: 3, label: "Personal Details" },
            { num: 4, label: "Payment Information" },
          ].map((s, idx) => {
            const isDone = step > s.num
            const isCurr = step === s.num
            return (
              <div
                key={s.num}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                {idx > 0 && (
                  <div
                    style={{
                      width: 40,
                      height: 2,
                      background: isDone ? F.success : F.border,
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isDone
                        ? F.success
                        : isCurr
                          ? F.brand
                          : "transparent",
                      border:
                        isDone || isCurr ? "none" : `1.5px solid ${F.border}`,
                      color: isDone || isCurr ? "#fff" : F.text3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {isDone ? "✓" : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: isCurr ? 700 : 500,
                      color: isCurr ? F.text1 : F.text2,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 10,
          padding: 28,
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name Fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="First Name *">
                <input
                  style={iSt}
                  value={basic.firstName}
                  onChange={(e) =>
                    setBasic({ ...basic, firstName: e.target.value })
                  }
                  placeholder="First Name"
                />
              </Fld>
              <Fld label="Middle Name">
                <input
                  style={iSt}
                  value={basic.middleName}
                  onChange={(e) =>
                    setBasic({ ...basic, middleName: e.target.value })
                  }
                  placeholder="Middle Name"
                />
              </Fld>
              <Fld label="Last Name">
                <input
                  style={iSt}
                  value={basic.lastName}
                  onChange={(e) =>
                    setBasic({ ...basic, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                />
              </Fld>
            </div>

            {/* Emp ID & Date of Joining */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Employee ID *">
                <input
                  style={iSt}
                  value={basic.empId}
                  onChange={(e) =>
                    setBasic({ ...basic, empId: e.target.value })
                  }
                />
              </Fld>
              <Fld label="Date of Joining *">
                <input
                  type="date"
                  style={iSt}
                  value={basic.doj}
                  onChange={(e) => setBasic({ ...basic, doj: e.target.value })}
                />
              </Fld>
            </div>

            {/* Email & Mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Work Email *">
                <input
                  style={iSt}
                  value={basic.email}
                  onChange={(e) =>
                    setBasic({ ...basic, email: e.target.value })
                  }
                  placeholder="abc@xyz.com"
                />
              </Fld>
              <Fld label="Mobile Number">
                <input
                  style={iSt}
                  value={basic.mobile}
                  onChange={(e) =>
                    setBasic({ ...basic, mobile: e.target.value })
                  }
                  placeholder="+91 9876543210"
                />
              </Fld>
            </div>

            {/* Director Checkbox */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: F.text1,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={basic.isDirector}
                onChange={(e) =>
                  setBasic({ ...basic, isDirector: e.target.checked })
                }
              />
              <span>
                Employee is a Director/person with substantial interest in the
                company.
              </span>
            </label>

            {/* Gender & Work Location */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Gender *">
                <select
                  style={iSt}
                  value={basic.gender}
                  onChange={(e) =>
                    setBasic({ ...basic, gender: e.target.value })
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </Fld>
              <Fld label="Work Location *">
                <select
                  style={iSt}
                  value={basic.workLocation}
                  onChange={(e) =>
                    setBasic({ ...basic, workLocation: e.target.value })
                  }
                >
                  <option>Head Office ( Swamy Ayyapa... )</option>
                  <option>Bangalore Branch</option>
                  <option>Mumbai Regional Office</option>
                  <option>Hyderabad Tech Park</option>
                </select>
              </Fld>
            </div>

            {/* Designation & Department */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Designation *">
                <select
                  style={iSt}
                  value={basic.designation}
                  onChange={(e) =>
                    setBasic({ ...basic, designation: e.target.value })
                  }
                >
                  <option>Packaged App Development Associate</option>
                  <option>Software Engineer</option>
                  <option>Senior Developer</option>
                  <option>Product Manager</option>
                  <option>HR Specialist</option>
                </select>
              </Fld>
              <Fld label="Department *">
                <select
                  style={iSt}
                  value={basic.department}
                  onChange={(e) =>
                    setBasic({ ...basic, department: e.target.value })
                  }
                >
                  <option>AI/ML</option>
                  <option>Engineering</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Sales</option>
                </select>
              </Fld>
            </div>

            {/* Enable Portal Access Checkbox */}
            <div
              style={{
                background: F.infoBg,
                border: `1px solid ${F.brand}30`,
                borderRadius: 8,
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: F.text1,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={basic.enablePortalAccess}
                  onChange={(e) =>
                    setBasic({ ...basic, enablePortalAccess: e.target.checked })
                  }
                />
                <span>Enable Portal Access</span>
              </label>
              <span style={{ fontSize: 12, color: F.text2, marginLeft: 22 }}>
                The employee will be able to view payslips, submit their IT
                declaration and create reimbursement claims through the employee
                portal.
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 16,
                borderTop: `1px solid ${F.border}`,
              }}
            >
              <div style={{ fontSize: 12, color: F.error }}>
                * indicates mandatory fields
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="secondary" onClick={handleSaveDraft}>
                  Save as Draft
                </Btn>
                <Btn variant="secondary" onClick={onBack}>
                  Cancel
                </Btn>
                <Btn onClick={handleNextStep1}>Save and Continue</Btn>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Statutory Components Card */}
            <div
              style={{
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: 20,
                background: F.card,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: F.text1,
                  marginBottom: 4,
                }}
              >
                Statutory Components
              </div>
              <div style={{ fontSize: 12, color: F.text2, marginBottom: 16 }}>
                Enable the necessary benefits and tax applicable for this
                employee.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: F.text1,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={statutory.epf}
                    onChange={(e) =>
                      setStatutory({ ...statutory, epf: e.target.checked })
                    }
                  />
                  <span>Employees' Provident Fund</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: F.text1,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={statutory.esi}
                    onChange={(e) =>
                      setStatutory({ ...statutory, esi: e.target.checked })
                    }
                  />
                  <span>Employees' State Insurance</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: F.text1,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={statutory.pt}
                    onChange={(e) =>
                      setStatutory({ ...statutory, pt: e.target.checked })
                    }
                  />
                  <span>Professional Tax</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: F.text1,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={statutory.lwf}
                    onChange={(e) =>
                      setStatutory({ ...statutory, lwf: e.target.checked })
                    }
                  />
                  <span>Labour Welfare Fund</span>
                </label>
              </div>
            </div>

            {/* Salary Structure Card */}
            <div
              style={{
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: 20,
                background: F.card,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: F.text1,
                  marginBottom: 4,
                }}
              >
                Salary Structure
              </div>
              <div style={{ fontSize: 12, color: F.text2, marginBottom: 16 }}>
                Set how the employee's salary is divided for accurate pay
                calculation.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: F.text1 }}>
                  Annual CTC *
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${F.border}`,
                    borderRadius: 6,
                    overflow: "hidden",
                    width: 220,
                  }}
                >
                  <span
                    style={{
                      padding: "8px 12px",
                      background: F.pageBg,
                      color: F.text2,
                      fontSize: 13,
                      borderRight: `1px solid ${F.border}`,
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    style={{
                      border: "none",
                      padding: "8px 10px",
                      width: "100%",
                      fontSize: 13,
                      outline: "none",
                    }}
                    value={annualCTC}
                    onChange={(e) => setAnnualCTC(Number(e.target.value) || 0)}
                  />
                </div>
                <span style={{ fontSize: 12, color: F.text3 }}>per year</span>
              </div>

              {/* Salary Components Table */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: F.pageBg,
                      borderBottom: `1px solid ${F.border}`,
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      SALARY COMPONENTS
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      CALCULATION TYPE
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px 12px",
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      MONTHLY AMOUNT
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px 12px",
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      ANNUAL AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${F.border}` }}>
                    <td style={{ padding: 12, fontWeight: 600 }}>Basic</td>
                    <td style={{ padding: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <input
                          type="number"
                          value={basicPct}
                          onChange={(e) =>
                            setBasicPct(Number(e.target.value) || 0)
                          }
                          style={{
                            width: 60,
                            padding: 4,
                            borderRadius: 4,
                            border: `1px solid ${F.border}`,
                          }}
                        />
                        <span style={{ color: F.text2, fontSize: 12 }}>
                          % of CTC
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      ₹{monthlyBasic.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      ₹{annualBasic.toLocaleString("en-IN")}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${F.border}` }}>
                    <td style={{ padding: 12 }}>
                      <div style={{ fontWeight: 600 }}>Fixed Allowance</div>
                      <div style={{ fontSize: 11, color: F.text3 }}>
                        Monthly CTC - Sum of all other components
                      </div>
                    </td>
                    <td style={{ padding: 12, color: F.text2 }}>
                      Fixed amount
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      ₹{monthlyFixed.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      ₹{annualFixed.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  background: F.infoBg,
                  borderRadius: 6,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                  fontWeight: 700,
                }}
              >
                <span>Cost to Company</span>
                <div style={{ display: "flex", gap: 32 }}>
                  <span>₹{monthlyCTC.toLocaleString("en-IN")}</span>
                  <span>₹{annualCTC.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 16,
                borderTop: `1px solid ${F.border}`,
              }}
            >
              <Btn variant="secondary" onClick={() => setStep(1)}>
                Previous
              </Btn>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="secondary" onClick={onBack}>
                  Cancel
                </Btn>
                <Btn onClick={handleNextStep2}>Save and Continue</Btn>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Date of Birth *">
                <input
                  type="date"
                  style={iSt}
                  value={personal.dob}
                  onChange={(e) =>
                    setPersonal({ ...personal, dob: e.target.value })
                  }
                />
              </Fld>
              <Fld label="Age">
                <input
                  style={iSt}
                  value={personal.age}
                  onChange={(e) =>
                    setPersonal({ ...personal, age: e.target.value })
                  }
                  placeholder="e.g. 26"
                />
              </Fld>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Father's Name *">
                <input
                  style={iSt}
                  value={personal.fatherName}
                  onChange={(e) =>
                    setPersonal({ ...personal, fatherName: e.target.value })
                  }
                />
              </Fld>
              <Fld label="PAN">
                <input
                  style={iSt}
                  value={personal.pan}
                  onChange={(e) =>
                    setPersonal({
                      ...personal,
                      pan: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="AAAAA0000A"
                />
              </Fld>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Fld label="Differently Abled Type">
                <select
                  style={iSt}
                  value={personal.differentlyAbled}
                  onChange={(e) =>
                    setPersonal({
                      ...personal,
                      differentlyAbled: e.target.value,
                    })
                  }
                >
                  <option>None</option>
                  <option>Visual Impairment</option>
                  <option>Hearing Impairment</option>
                  <option>Locomotor</option>
                </select>
              </Fld>
              <Fld label="Personal Email Address">
                <input
                  style={iSt}
                  value={personal.personalEmail}
                  onChange={(e) =>
                    setPersonal({ ...personal, personalEmail: e.target.value })
                  }
                  placeholder="abc@xyz.com"
                />
              </Fld>
            </div>

            {/* Address */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 6,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                Residential Address
              </div>
              <input
                style={iSt}
                value={personal.addr1}
                onChange={(e) =>
                  setPersonal({ ...personal, addr1: e.target.value })
                }
                placeholder="Address Line 1"
              />
              <input
                style={iSt}
                value={personal.addr2}
                onChange={(e) =>
                  setPersonal({ ...personal, addr2: e.target.value })
                }
                placeholder="Address Line 2"
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                }}
              >
                <input
                  style={iSt}
                  value={personal.city}
                  onChange={(e) =>
                    setPersonal({ ...personal, city: e.target.value })
                  }
                  placeholder="Town/City"
                />
                <select
                  style={iSt}
                  value={personal.state}
                  onChange={(e) =>
                    setPersonal({ ...personal, state: e.target.value })
                  }
                >
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Telangana</option>
                  <option>Tamil Nadu</option>
                  <option>Delhi</option>
                </select>
                <input
                  style={iSt}
                  value={personal.pincode}
                  onChange={(e) =>
                    setPersonal({ ...personal, pincode: e.target.value })
                  }
                  placeholder="PIN Code"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 16,
                borderTop: `1px solid ${F.border}`,
              }}
            >
              <Btn variant="secondary" onClick={() => setStep(2)}>
                Previous
              </Btn>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="secondary" onClick={() => setStep(4)}>
                  Skip
                </Btn>
                <Btn onClick={handleNextStep3}>Save and Continue</Btn>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: F.text1,
                marginBottom: 4,
              }}
            >
              How would you like to pay this employee? *
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  id: "direct_deposit",
                  title: "Direct Deposit (Automated Process)",
                  desc: "Transfer the Employee's pay directly to their bank account.",
                },
                {
                  id: "bank_transfer",
                  title: "Bank Transfer (Manual Process)",
                  desc: "Download Bank Advice and process the payment through your bank's website",
                },
                {
                  id: "cheque",
                  title: "Cheque",
                  desc: "Record the Employee's pay as paid by cheque.",
                },
                {
                  id: "cash",
                  title: "Cash",
                  desc: "Record the Employee's pay as paid in cash.",
                },
              ].map((method) => {
                const selected = paymentMethod === method.id
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    style={{
                      border: `1px solid ${selected ? F.brand : F.border}`,
                      background: selected ? F.infoBg : F.card,
                      borderRadius: 8,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: F.text1,
                        }}
                      >
                        {method.title}
                      </div>
                      <div
                        style={{ fontSize: 12, color: F.text2, marginTop: 2 }}
                      >
                        {method.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${selected ? F.brand : F.text3}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selected && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: F.brand,
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${F.border}`,
              }}
            >
              <Btn variant="secondary" onClick={() => setStep(3)}>
                Previous
              </Btn>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="secondary" onClick={onBack}>
                  Cancel
                </Btn>
                <Btn onClick={handleFinish}>Complete Setup & Save</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Bulk Upload Page ──────────────────────────────────────────────────────────
function BulkUploadPage({
  ss,
  emps,
  setEmps,
  onBack,
}: {
  ss: SalaryStructure[]
  emps: Employee[]
  setEmps: React.Dispatch<React.SetStateAction<Employee[]>>
  onBack: () => void
}) {
  const toast = useToast()
  type RowState = "valid" | "error" | "duplicate"
  interface ParsedRow {
    name: string
    email: string
    department: string
    designation: string
    doj: string
    empType: string
    location: string
    salaryStructure: string
    state: RowState
    error?: string
  }

  const [step, setStep] = useState<"upload" | "preview" | "done">("upload")
  const [rows, setRows] = useState<ParsedRow[]>([])
  const [importedList, setImportedList] = useState<Employee[]>([])
  const [dragging, setDragging] = useState(false)
  const [previewSearch, setPreviewSearch] = useState("")
  const [previewFilter, setPreviewFilter] = useState<"all" | "valid" | "error" | "duplicate">("all")

  const TEMPLATE_CSV = `Name,Email,Department,Designation,Date of Joining,Employment Type,Location,Salary Structure
Amit Patel,amit.patel@naxrita.in,Engineering,Software Engineer,2026-09-01,Full-Time,Bangalore,Junior Engineer
Sneha Kulkarni,sneha.kulkarni@naxrita.in,HR,HR Executive,2026-09-01,Full-Time,Mumbai,Associate
Deepak Joshi,deepak.joshi@naxrita.in,Finance,Finance Analyst,2026-09-01,Full-Time,Hyderabad,Associate`

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: "text/csv" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "naxpayroll_bulk_employee_template.csv"
    a.click()
    toast("Template downloaded successfully", "success")
  }

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n").filter(Boolean)
    if (lines.length < 2) {
      toast("CSV file contains no data rows", "error")
      return
    }
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const parsed: ParsedRow[] = lines.slice(1).map((line) => {
      const cols = line.split(",").map((c) => c.trim())
      const get = (key: string) => cols[headers.indexOf(key)] ?? ""
      const name = get("name")
      const email = get("email")
      const dept = get("department") || "Operations"
      const desig = get("designation") || "Associate"
      const doj = get("date of joining") || new Date().toISOString().slice(0, 10)
      const type = get("employment type") || "Full-Time"
      const loc = get("location") || "Corporate HQ"
      const struc = get("salary structure") || ss[0]?.name || "Associate"
      const dup = emps.some(
        (e) => e.email.toLowerCase() === email.toLowerCase(),
      )
      const validSS = ss.some((s) => s.name === struc)
      let state: RowState = "valid"
      let error = ""
      if (!name || !email) {
        state = "error"
        error = "Name or Email missing"
      } else if (dup) {
        state = "duplicate"
        error = "Email already registered"
      } else if (!validSS) {
        state = "error"
        error = `Salary structure "${struc}" not found`
      }
      return {
        name,
        email,
        department: dept,
        designation: desig,
        doj,
        empType: type,
        location: loc,
        salaryStructure: struc,
        state,
        error,
      }
    })
    setRows(parsed)
    setStep("preview")
    toast(`Parsed ${parsed.length} rows from CSV`, "info")
  }

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast("Please select a valid .csv file", "error")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => parseCSV(e.target?.result as string)
    reader.readAsText(file)
  }

  const loadDemoCSV = () => {
    parseCSV(TEMPLATE_CSV)
  }

  const importValid = () => {
    const validRows = rows.filter((r) => r.state === "valid")
    if (validRows.length === 0) {
      return toast("No valid rows available to import", "error")
    }

    const newEmps: Employee[] = validRows.map((r, i) => ({
      id: `EMP-${String(emps.length + i + 1).padStart(3, "0")}`,
      name: r.name,
      email: r.email,
      department: r.department,
      designation: r.designation,
      doj: r.doj || new Date().toISOString().slice(0, 10),
      empType: r.empType as Employee["empType"],
      manager: "Meena Iyer",
      location: r.location,
      status: "Active" as EmpStatus,
      salaryStructure: r.salaryStructure,
      grossSalary: ss.find((s) => s.name === r.salaryStructure)?.gross ?? 60000,
    }))

    setEmps((prev) => [...prev, ...newEmps])
    setImportedList(newEmps)
    setStep("done")
    toast(`Successfully imported ${newEmps.length} employees!`, "success")
  }

  const validCount = rows.filter((r) => r.state === "valid").length
  const errorCount = rows.filter((r) => r.state === "error").length
  const dupCount = rows.filter((r) => r.state === "duplicate").length

  const filteredPreviewRows = rows.filter((r) => {
    if (previewSearch && !r.name.toLowerCase().includes(previewSearch.toLowerCase()) && !r.email.toLowerCase().includes(previewSearch.toLowerCase())) {
      return false
    }
    if (previewFilter !== "all" && r.state !== previewFilter) {
      return false
    }
    return true
  })

  const stateColor: Record<RowState, string> = {
    valid: F.success,
    error: F.error,
    duplicate: F.warning,
  }
  const stateBg: Record<RowState, string> = {
    valid: F.successBg,
    error: F.errorBg,
    duplicate: F.warningBg,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Top Breadcrumb Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: F.text2,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: F.brand,
            fontWeight: 700,
            fontSize: 13,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>&larr;</span>
          <span>Employees</span>
        </button>
        <span style={{ color: F.border }}>/</span>
        <span style={{ color: F.text1, fontWeight: 700 }}>
          Bulk Employee Onboarding
        </span>
      </div>

      {/* Enhanced 3-Step Stepper Progress Bar */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {[
          { key: "upload", stepNum: 1, label: "1. Upload CSV" },
          { key: "preview", stepNum: 2, label: "2. Review & Validate" },
          { key: "done", stepNum: 3, label: "3. Done & Summary" },
        ].map((item, i) => {
          const isDone =
            step === "done"
              ? true
              : step === "preview"
              ? i === 0
              : false
          const isActive = step === item.key

          return (
            <Fragment key={item.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: isDone
                      ? F.success
                      : isActive
                      ? F.brand
                      : F.pageBg,
                    border: `2px solid ${
                      isDone
                        ? F.success
                        : isActive
                        ? F.brand
                        : F.border
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isDone ? (
                    <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 14 }}>
                      ✓
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: isActive ? "#FFFFFF" : F.text2,
                      }}
                    >
                      {item.stepNum}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: isActive || isDone ? 700 : 500,
                    color: isActive ? F.brand : isDone ? F.success : F.text2,
                  }}
                >
                  {item.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: isDone ? F.success : F.border,
                    margin: "0 16px",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </Fragment>
          )
        })}
      </div>

      {/* STEP 1: UPLOAD CSV */}
      {step === "upload" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
          {/* Dropzone Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              const f = e.dataTransfer.files[0]
              if (f) handleFile(f)
            }}
            style={{
              background: dragging ? F.infoBg : F.card,
              border: `2px dashed ${dragging ? F.brand : F.border}`,
              borderRadius: 12,
              padding: "60px 40px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: F.infoBg,
                border: `1px solid ${F.brand}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                marginBottom: 16,
                color: F.brand,
              }}
            >
              ☁️
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: F.text1, marginBottom: 6 }}>
              Drop your CSV file here
            </div>
            <div style={{ fontSize: 13, color: F.text2, marginBottom: 20 }}>
              Supports standard comma-separated .csv employee records
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Btn
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = ".csv"
                  input.onchange = (e) => {
                    const f = (e.target as HTMLInputElement).files?.[0]
                    if (f) handleFile(f)
                  }
                  input.click()
                }}
              >
                Browse CSV File
              </Btn>
              <Btn variant="secondary" onClick={loadDemoCSV}>
                ⚡ Load Sample Demo CSV
              </Btn>
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: F.card,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "18px 20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: F.text2,
                  marginBottom: 12,
                }}
              >
                Mandatory CSV Headers
              </div>
              {[
                "Name",
                "Email",
                "Department",
                "Designation",
                "Date of Joining",
                "Employment Type",
                "Location",
                "Salary Structure",
              ].map((col) => (
                <div
                  key={col}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 0",
                    borderBottom: `1px solid ${F.border}60`,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: F.success, fontWeight: 800 }}>✓</span>
                  <span style={{ color: F.text1, fontWeight: 600 }}>{col}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: F.successBg,
                border: `1px solid ${F.success}30`,
                borderRadius: 8,
                padding: "16px 18px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: F.success, marginBottom: 4 }}>
                Download CSV Template
              </div>
              <div style={{ fontSize: 12, color: F.text2, marginBottom: 12, lineHeight: 1.4 }}>
                Pre-formatted template with verified column headers and 3 sample entries.
              </div>
              <Btn small onClick={downloadTemplate}>
                Download Template.csv
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW & VALIDATE */}
      {step === "preview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Summary Chips Bar */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span
                style={{
                  padding: "6px 12px",
                  background: F.successBg,
                  border: `1px solid ${F.success}40`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: F.success,
                }}
              >
                ✓ {validCount} Valid Records
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  background: errorCount > 0 ? F.errorBg : F.pageBg,
                  border: `1px solid ${errorCount > 0 ? F.error : F.border}40`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: errorCount > 0 ? F.error : F.text3,
                }}
              >
                &times; {errorCount} Validation Errors
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  background: dupCount > 0 ? F.warningBg : F.pageBg,
                  border: `1px solid ${dupCount > 0 ? F.warning : F.border}40`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: dupCount > 0 ? F.warning : F.text3,
                }}
              >
                ! {dupCount} Duplicates Skipped
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Btn
                variant="secondary"
                onClick={() => {
                  setRows([])
                  setStep("upload")
                }}
              >
                Re-upload File
              </Btn>
              <Btn disabled={validCount === 0} onClick={importValid}>
                Import {validCount} Employees &rarr;
              </Btn>
            </div>
          </div>

          {/* Validation Table */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${F.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                CSV Record Validation Sheet ({rows.length} Total Rows)
              </span>
              <span style={{ fontSize: 11, color: F.text3 }}>
                Only valid records will be written to the database.
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${F.border}`,
                      background: F.pageBg,
                      color: F.text2,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>#</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Employee Name</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Email Address</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Department</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Designation</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Salary Structure</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Date of Joining</th>
                    <th style={{ padding: "10px 18px", textAlign: "center" }}>Validation Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPreviewRows.map((r, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: `1px solid ${F.border}60`,
                        background: r.state !== "valid" ? stateBg[r.state] : "transparent",
                      }}
                    >
                      <td style={{ padding: "12px 14px", textAlign: "center", color: F.text3, fontSize: 11 }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: F.text1 }}>
                        {r.name || "—"}
                      </td>
                      <td style={{ padding: "12px 14px", color: F.text2 }}>
                        {r.email || "—"}
                      </td>
                      <td style={{ padding: "12px 14px", color: F.text2 }}>{r.department}</td>
                      <td style={{ padding: "12px 14px", color: F.text2 }}>{r.designation}</td>
                      <td style={{ padding: "12px 14px", color: F.brand, fontWeight: 600 }}>
                        {r.salaryStructure}
                      </td>
                      <td style={{ padding: "12px 14px", color: F.text3, fontSize: 12 }}>{r.doj}</td>
                      <td style={{ padding: "12px 18px", textAlign: "center" }}>
                        <Badge
                          label={r.error || "Valid"}
                          color={stateColor[r.state]}
                          bg={stateBg[r.state]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DONE & SUMMARY REPORT */}
      {step === "done" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Executive Success Card */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 12,
              padding: "40px 32px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: F.successBg,
                border: `3px solid ${F.success}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 28,
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: F.text1,
                margin: "0 0 6px",
              }}
            >
              Bulk Onboarding Complete!
            </h2>
            <p style={{ fontSize: 14, color: F.text2, margin: "0 0 24px" }}>
              Successfully imported <strong>{importedList.length}</strong> new employee record{importedList.length !== 1 ? "s" : ""} to Naxrita Solutions.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Btn onClick={onBack}>View All Employees &rarr;</Btn>
              <Btn
                variant="secondary"
                onClick={() => {
                  setRows([])
                  setImportedList([])
                  setStep("upload")
                }}
              >
                Upload Another File
              </Btn>
            </div>
          </div>

          {/* Report Sheet of Newly Imported Employees */}
          {importedList.length > 0 && (
            <div
              style={{
                background: F.card,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: `1px solid ${F.border}`,
                  background: F.successBg,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: F.success }}>
                  Newly Assigned Employee Records
                </span>
                <span style={{ fontSize: 12, color: F.text2 }}>
                  Status: Active &bull; Accounts Provisioned
                </span>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: `1px solid ${F.border}`,
                        background: F.pageBg,
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      <th style={{ padding: "10px 18px", textAlign: "left" }}>Assigned ID</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Employee Name</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Email</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Department</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Designation</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Salary Structure</th>
                      <th style={{ padding: "10px 18px", textAlign: "center" }}>Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importedList.map((emp) => (
                      <tr key={emp.id} style={{ borderBottom: `1px solid ${F.border}60` }}>
                        <td style={{ padding: "12px 18px", fontWeight: 800, color: F.brand }}>
                          {emp.id}
                        </td>
                        <td style={{ padding: "12px 14px", fontWeight: 700, color: F.text1 }}>
                          {emp.name}
                        </td>
                        <td style={{ padding: "12px 14px", color: F.text2 }}>{emp.email}</td>
                        <td style={{ padding: "12px 14px", color: F.text2 }}>{emp.department}</td>
                        <td style={{ padding: "12px 14px", color: F.text2 }}>{emp.designation}</td>
                        <td style={{ padding: "12px 14px", color: F.text1, fontWeight: 600 }}>
                          {emp.salaryStructure}
                        </td>
                        <td style={{ padding: "12px 18px", textAlign: "center" }}>
                          <Badge label="Active" color={F.success} bg={F.successBg} dot={F.success} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function EmployeesView({
  emps,
  setEmps,
  ss,
}: {
  emps: Employee[]
  setEmps: React.Dispatch<React.SetStateAction<Employee[]>>
  ss: SalaryStructure[]
}) {
  const toast = useToast()
  const [search, setSearch] = useState("")
  const [deptF, setDeptF] = useState("All")
  const [statusF, setStatusF] = useState("All")
  const [typeF, setTypeF] = useState("All")
  const [locF, setLocF] = useState("All")
  const [ssF, setSSF] = useState("All")
  const [salMin, setSalMin] = useState("")
  const [salMax, setSalMax] = useState("")
  const [dojYear, setDojYear] = useState("All")
  const [showAdv, setShowAdv] = useState(false)
  const [subPage, setSubPage] = useState<{ type: "detail" emp: Employee } | {
    type: "bulk"
  } | { type: "new" } | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [editEmp, setEditEmp] = useState<Employee | null>(null)
  const [confirm, setConfirm] = useState<{
    msg: string
    onOk: () => void
  } | null>(null)
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    department: "Engineering",
    designation: "",
    doj: "",
    empType: "Full-Time" as Employee["empType"],
    manager: "",
    location: "",
    salaryStructure: "Senior Engineer",
  })

  // When employee list changes, refresh the selected employee if viewing detail
  const selEmp =
    subPage?.type === "detail"
      ? (emps.find((e) => e.id === subPage.emp.id) ?? subPage.emp)
      : null

  if (subPage?.type === "bulk")
    return (
      <BulkUploadPage
        ss={ss}
        emps={emps}
        setEmps={setEmps}
        onBack={() => setSubPage(null)}
      />
    )
  if (subPage?.type === "new")
    return (
      <AddEmployeeWizardPage
        ss={ss}
        emps={emps}
        setEmps={setEmps}
        onBack={() => setSubPage(null)}
      />
    )
  if (subPage?.type === "detail" && selEmp)
    return (
      <EmployeeDetailPage
        emp={selEmp}
        ss={ss}
        emps={emps}
        setEmps={setEmps}
        onBack={() => setSubPage(null)}
      />
    )

  const depts = ["All", ...Array.from(new Set(emps.map((e) => e.department)))]
  const locs = ["All", ...Array.from(new Set(emps.map((e) => e.location)))]
  const structs = [
    "All",
    ...Array.from(new Set(emps.map((e) => e.salaryStructure))),
  ]
  const dojYears = [
    "All",
    ...Array.from(new Set(emps.map((e) => e.doj.slice(0, 4)))).sort(),
  ]
  const empSearchVals = emps.map((e) => `${e.name} (${e.id})`)

  const activeFilters =
    [deptF, typeF, locF, ssF, dojYear].filter((v) => v !== "All").length +
    (salMin ? 1 : 0) +
    (salMax ? 1 : 0)

  const filtered = emps.filter((e) => {
    const q = search.toLowerCase()
    const nameMatch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q)
    return (
      nameMatch &&
      (deptF === "All" || e.department === deptF) &&
      (statusF === "All" || e.status === statusF) &&
      (typeF === "All" || e.empType === typeF) &&
      (locF === "All" || e.location === locF) &&
      (ssF === "All" || e.salaryStructure === ssF) &&
      (dojYear === "All" || e.doj.startsWith(dojYear)) &&
      (!salMin || e.grossSalary >= parseInt(salMin) * 1000) &&
      (!salMax || e.grossSalary <= parseInt(salMax) * 1000)
    )
  })

  const addEmployee = () => {
    if (!addForm.name || !addForm.email)
      return toast("Name and email are required", "error")
    const newId = `EMP-${String(emps.length + 1).padStart(3, "0")}`
    const newEmp: Employee = {
      id: newId,
      ...addForm,
      status: "Active",
      grossSalary:
        ss.find((s) => s.name === addForm.salaryStructure)?.gross ?? 0,
    }
    setEmps([...emps, newEmp])
    setShowAdd(false)
    setAddForm({
      name: "",
      email: "",
      department: "Engineering",
      designation: "",
      doj: "",
      empType: "Full-Time",
      manager: "",
      location: "",
      salaryStructure: "Senior Engineer",
    })
    toast(`${newEmp.name} added successfully`, "success")
  }

  const saveEdit = () => {
    if (!editEmp) return
    setEmps(emps.map((e) => (e.id === editEmp.id ? editEmp : e)))
    setEditEmp(null)
    toast("Employee updated", "success")
  }

  const toggleStatus = (emp: Employee) => {
    const next: EmpStatus = emp.status === "Active" ? "Inactive" : "Active"
    setConfirm({
      msg: `Set ${emp.name} to ${next}?`,
      onOk: () => {
        setEmps(emps.map((e) => (e.id === emp.id ? { ...e, status: next } : e)))
        toast(`Status updated to ${next}`, "success")
        setConfirm(null)
      },
    })
  }

  return (
    <div>
      <PH
        title="Employees"
        sub={`${emps.length} employees · Naxrita Solutions`}
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn
              variant="secondary"
              onClick={() => toast("Employee list exported as CSV", "success")}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </Btn>
            <Btn
              variant="secondary"
              onClick={() => setSubPage({ type: "bulk" })}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Bulk Upload
            </Btn>
            <Btn onClick={() => setSubPage({ type: "new" })}>
              + Add Employee
            </Btn>
          </div>
        }
      />

      {/* Status chips */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}
      >
        {[
          { l: "All", v: emps.length, c: F.brand },
          {
            l: "Active",
            v: emps.filter((e) => e.status === "Active").length,
            c: F.success,
          },
          {
            l: "On Leave",
            v: emps.filter((e) => e.status === "On Leave").length,
            c: F.warning,
          },
          {
            l: "Incomplete",
            v: emps.filter((e) => e.status === "Incomplete").length,
            c: F.warning,
          },
          {
            l: "Inactive",
            v: emps.filter((e) => e.status === "Inactive").length,
            c: F.text3,
          },
        ].map((x) => (
          <div
            key={x.l}
            onClick={() => setStatusF(x.l === "All" ? "All" : x.l)}
            style={{
              padding: "5px 14px",
              background:
                statusF === (x.l === "All" ? "All" : x.l) ? `${x.c}15` : F.card,
              border: `1px solid ${
                statusF === (x.l === "All" ? "All" : x.l) ? x.c : F.border
              }`,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: x.c,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800 }}>{x.v}</span>
            {x.l}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowAdv((v) => !v)}
          style={{
            padding: "5px 14px",
            background: showAdv || activeFilters > 0 ? F.infoBg : F.card,
            border: `1px solid ${activeFilters > 0 ? F.brand : F.border}`,
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: activeFilters > 0 ? F.brand : F.text2,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filters{" "}
          {activeFilters > 0 && (
            <span
              style={{
                background: F.brand,
                color: "#fff",
                borderRadius: 10,
                padding: "0 6px",
                fontSize: 11,
              }}
            >
              {activeFilters}
            </span>
          )}
        </button>
        {(search || activeFilters > 0) && (
          <button
            onClick={() => {
              setSearch("")
              setDeptF("All")
              setTypeF("All")
              setLocF("All")
              setSSF("All")
              setSalMin("")
              setSalMax("")
              setDojYear("All")
            }}
            style={{
              padding: "5px 12px",
              background: F.errorBg,
              border: `1px solid #e8b4b4`,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: F.error,
              fontFamily: "inherit",
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Incomplete profiles banner alert */}
      {emps.filter((e) => e.status === "Incomplete").length > 0 && (
        <div
          style={{
            background: "#FFF8E1",
            border: "1px solid #FFE082",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#B78103",
            fontSize: 13,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15 }}>⚠️</span>
            <span>
              You have{" "}
              <strong>
                {emps.filter((e) => e.status === "Incomplete").length}{" "}
                incomplete employee profiles
              </strong>
              . Complete setup to process their payroll.
            </span>
          </div>
          <button
            onClick={() => setStatusF("Incomplete")}
            style={{
              background: "none",
              border: "none",
              color: F.brand,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: 13,
            }}
          >
            View Incomplete
          </button>
        </div>
      )}

      {/* Primary search + quick selects */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: showAdv ? 8 : 14,
          flexWrap: "wrap",
        }}
      >
        <ValueHelp
          value={search}
          onChange={setSearch}
          placeholder="Search name, ID, email, designation…"
          values={empSearchVals}
        />
        <select
          value={deptF}
          onChange={(e) => setDeptF(e.target.value)}
          style={{ ...iSt, width: 160 }}
        >
          {depts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={typeF}
          onChange={(e) => setTypeF(e.target.value)}
          style={{ ...iSt, width: 140 }}
        >
          {["All", "Full-Time", "Part-Time", "Contract"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Advanced filter panel */}
      {showAdv && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "14px 18px",
            marginBottom: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 12,
          }}
        >
          <Fld label="Location">
            <select
              value={locF}
              onChange={(e) => setLocF(e.target.value)}
              style={iSt}
            >
              {locs.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Fld>
          <Fld label="Salary Structure">
            <select
              value={ssF}
              onChange={(e) => setSSF(e.target.value)}
              style={iSt}
            >
              {structs.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Fld>
          <Fld label="Joining Year">
            <select
              value={dojYear}
              onChange={(e) => setDojYear(e.target.value)}
              style={iSt}
            >
              {dojYears.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </Fld>
          <Fld label="Min Gross Salary (₹K)">
            <input
              type="number"
              value={salMin}
              onChange={(e) => setSalMin(e.target.value)}
              placeholder="e.g. 50"
              style={iSt}
            />
          </Fld>
          <Fld label="Max Gross Salary (₹K)">
            <input
              type="number"
              value={salMax}
              onChange={(e) => setSalMax(e.target.value)}
              placeholder="e.g. 200"
              style={iSt}
            />
          </Fld>
        </div>
      )}

      {/* Active filter pills */}
      {activeFilters > 0 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          {deptF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Dept: {deptF}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setDeptF("All")}
              >
                ×
              </span>
            </span>
          )}
          {typeF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Type: {typeF}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setTypeF("All")}
              >
                ×
              </span>
            </span>
          )}
          {locF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Location: {locF}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setLocF("All")}
              >
                ×
              </span>
            </span>
          )}
          {ssF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Structure: {ssF}{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setSSF("All")}>
                ×
              </span>
            </span>
          )}
          {dojYear !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Joined: {dojYear}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setDojYear("All")}
              >
                ×
              </span>
            </span>
          )}
          {salMin && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Min: ₹{salMin}K{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setSalMin("")}>
                ×
              </span>
            </span>
          )}
          {salMax && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Max: ₹{salMax}K{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setSalMax("")}>
                ×
              </span>
            </span>
          )}
          <span style={{ fontSize: 12, color: F.text3, alignSelf: "center" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th>Employee</Th>
              <Th>Department</Th>
              <Th>Designation</Th>
              <Th>Type</Th>
              <Th>Location</Th>
              <Th right>Gross Salary</Th>
              <Th>Joined</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: 48,
                    textAlign: "center",
                    color: F.text3,
                    fontSize: 13,
                  }}
                >
                  No employees match filters.
                </td>
              </tr>
            )}
            {filtered.map((e) => (
              <TrH
                key={e.id}
                onClick={() => setSubPage({ type: "detail", emp: e })}
              >
                <Td>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background:
                          e.status === "Incomplete" ? "#E9730C" : F.brand,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {e.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color:
                            e.status === "Incomplete" ? "#0070F2" : F.text1,
                        }}
                      >
                        {e.name}
                      </div>
                      <div style={{ fontSize: 11, color: F.text3 }}>
                        {e.id} · {e.designation}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td>{e.status === "Incomplete" ? "-" : e.department}</Td>
                <Td>
                  <span style={{ fontSize: 12 }}>{e.designation}</span>
                </Td>
                <Td>
                  {e.status === "Incomplete" ? (
                    <span style={{ fontSize: 12, color: F.text3 }}>-</span>
                  ) : (
                    <Badge
                      label={e.empType}
                      color={e.empType === "Contract" ? F.warning : F.brand}
                      bg={e.empType === "Contract" ? F.warningBg : F.infoBg}
                    />
                  )}
                </Td>
                <Td>{e.status === "Incomplete" ? "-" : e.location}</Td>
                <Td right>
                  <span style={{ fontWeight: 700 }}>
                    {e.status === "Incomplete" ? "-" : inr(e.grossSalary)}
                  </span>
                </Td>
                <Td>{fmtD(e.doj)}</Td>
                <Td colSpan={e.status === "Incomplete" ? 1 : 1}>
                  {e.status === "Incomplete" ? (
                    <div
                      style={{
                        background: "#FFF8E1",
                        border: "1px solid #FFE082",
                        borderRadius: 6,
                        padding: "6px 12px",
                        display: "flex",
                        alignItems: "center",
                        justify: "space-between",
                        gap: 8,
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#B78103",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        ℹ️ This employee's profile is incomplete.
                      </span>
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation()
                          setSubPage({ type: "new" })
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#0070F2",
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Complete now
                      </button>
                    </div>
                  ) : (
                    empBadge(e.status)
                  )}
                </Td>
                <Td>
                  <div
                    style={{ display: "flex", gap: 4 }}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    {e.status === "Incomplete" ? (
                      <Btn
                        small
                        variant="secondary"
                        onClick={() => setSubPage({ type: "new" })}
                      >
                        Complete Setup
                      </Btn>
                    ) : (
                      <>
                        <Btn
                          small
                          variant="secondary"
                          onClick={() => setSubPage({ type: "detail", emp: e })}
                        >
                          View
                        </Btn>
                        <Btn
                          small
                          variant={e.status === "Active" ? "danger" : "success"}
                          onClick={() => toggleStatus(e)}
                        >
                          {e.status === "Active" ? "Deactivate" : "Activate"}
                        </Btn>
                      </>
                    )}
                  </div>
                </Td>
              </TrH>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="Add New Employee" onClose={() => setShowAdd(false)}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Full Name *">
              <input
                style={iSt}
                value={addForm.name}
                onChange={(e) =>
                  setAddForm({ ...addForm, name: e.target.value })
                }
                placeholder="e.g. Priya Nair"
              />
            </Fld>
            <Fld label="Email *">
              <input
                style={iSt}
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
                placeholder="priya@company.in"
              />
            </Fld>
            <Fld label="Department">
              <select
                style={iSt}
                value={addForm.department}
                onChange={(e) =>
                  setAddForm({ ...addForm, department: e.target.value })
                }
              >
                {[
                  "Engineering",
                  "HR",
                  "Finance",
                  "Sales",
                  "Design",
                  "Management",
                  "Operations",
                ].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Fld>
            <Fld label="Designation">
              <input
                style={iSt}
                value={addForm.designation}
                onChange={(e) =>
                  setAddForm({ ...addForm, designation: e.target.value })
                }
              />
            </Fld>
            <Fld label="Date of Joining">
              <input
                type="date"
                style={iSt}
                value={addForm.doj}
                onChange={(e) =>
                  setAddForm({ ...addForm, doj: e.target.value })
                }
              />
            </Fld>
            <Fld label="Employment Type">
              <select
                style={iSt}
                value={addForm.empType}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    empType: e.target.value as Employee["empType"],
                  })
                }
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
              </select>
            </Fld>
            <Fld label="Work Location">
              <input
                style={iSt}
                value={addForm.location}
                onChange={(e) =>
                  setAddForm({ ...addForm, location: e.target.value })
                }
              />
            </Fld>
            <Fld label="Reporting Manager">
              <select
                style={iSt}
                value={addForm.manager}
                onChange={(e) =>
                  setAddForm({ ...addForm, manager: e.target.value })
                }
              >
                <option value="">— none —</option>
                {emps.map((e) => (
                  <option key={e.id}>{e.name}</option>
                ))}
              </select>
            </Fld>
            <Fld label="Salary Structure">
              <select
                style={iSt}
                value={addForm.salaryStructure}
                onChange={(e) =>
                  setAddForm({ ...addForm, salaryStructure: e.target.value })
                }
              >
                {ss.map((s) => (
                  <option key={s.id}>
                    {s.name} ({inr(s.gross)}/mo)
                  </option>
                ))}
              </select>
            </Fld>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <Btn variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Btn>
            <Btn onClick={addEmployee}>Save Employee</Btn>
          </div>
        </Modal>
      )}

      {editEmp && (
        <Modal
          title={`Edit - ${editEmp.name}`}
          onClose={() => setEditEmp(null)}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Full Name">
              <input
                style={iSt}
                value={editEmp.name}
                onChange={(e) =>
                  setEditEmp({ ...editEmp, name: e.target.value })
                }
              />
            </Fld>
            <Fld label="Email">
              <input
                style={iSt}
                value={editEmp.email}
                onChange={(e) =>
                  setEditEmp({ ...editEmp, email: e.target.value })
                }
              />
            </Fld>
            <Fld label="Department">
              <select
                style={iSt}
                value={editEmp.department}
                onChange={(e) =>
                  setEditEmp({ ...editEmp, department: e.target.value })
                }
              >
                {[
                  "Engineering",
                  "HR",
                  "Finance",
                  "Sales",
                  "Design",
                  "Management",
                  "Operations",
                ].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Fld>
            <Fld label="Designation">
              <input
                style={iSt}
                value={editEmp.designation}
                onChange={(e) =>
                  setEditEmp({ ...editEmp, designation: e.target.value })
                }
              />
            </Fld>
            <Fld label="Work Location">
              <input
                style={iSt}
                value={editEmp.location}
                onChange={(e) =>
                  setEditEmp({ ...editEmp, location: e.target.value })
                }
              />
            </Fld>
            <Fld label="Employment Type">
              <select
                style={iSt}
                value={editEmp.empType}
                onChange={(e) =>
                  setEditEmp({
                    ...editEmp,
                    empType: e.target.value as Employee["empType"],
                  })
                }
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
              </select>
            </Fld>
            <Fld label="Salary Structure">
              <select
                style={iSt}
                value={editEmp.salaryStructure}
                onChange={(e) =>
                  setEditEmp({
                    ...editEmp,
                    salaryStructure: e.target.value,
                    grossSalary:
                      ss.find((s) => s.name === e.target.value)?.gross ??
                      editEmp.grossSalary,
                  })
                }
              >
                {ss.map((s) => (
                  <option key={s.id}>
                    {s.name} ({inr(s.gross)}/mo)
                  </option>
                ))}
              </select>
            </Fld>
            <Fld label="Status">
              <select
                style={iSt}
                value={editEmp.status}
                onChange={(e) =>
                  setEditEmp({
                    ...editEmp,
                    status: e.target.value as EmpStatus,
                  })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </Fld>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <Btn variant="secondary" onClick={() => setEditEmp(null)}>
              Cancel
            </Btn>
            <Btn onClick={saveEdit}>Save Changes</Btn>
          </div>
        </Modal>
      )}

      {confirm && (
        <Confirm
          msg={confirm.msg}
          onOk={confirm.onOk}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}

function SalaryManagementView({
  emps,
  ss,
  setSS,
}: {
  emps: Employee[]
  ss: SalaryStructure[]
  setSS: React.Dispatch<React.SetStateAction<SalaryStructure[]>>
}) {
  const toast = useToast()
  const [tab, setTab] = useState<"structures" | "components" | "assignment">(
    "structures",
  )
  const [showNewSS, setShowNewSS] = useState(false)
  const [editSS, setEditSS] = useState<SalaryStructure | null>(null)
  const [newSS, setNewSS] = useState({
    name: "",
    basic: 0,
    hra: 0,
    fixedAllowance: 0,
    specialAllowance: 0,
  })

  const saveNewSS = () => {
    if (!newSS.name) return toast("Structure name is required", "error")
    const gross =
      newSS.basic + newSS.hra + newSS.fixedAllowance + newSS.specialAllowance
    setSS([
      ...ss,
      { id: `SS-${String(ss.length + 1).padStart(3, "0")}`, ...newSS, gross },
    ])
    setShowNewSS(false)
    setNewSS({
      name: "",
      basic: 0,
      hra: 0,
      fixedAllowance: 0,
      specialAllowance: 0,
    })
    toast("Salary structure created", "success")
  }
  const saveEditSS = () => {
    if (!editSS) return
    const gross =
      editSS.basic +
      editSS.hra +
      editSS.fixedAllowance +
      editSS.specialAllowance
    setSS(ss.map((s) => (s.id === editSS.id ? { ...editSS, gross } : s)))
    setEditSS(null)
    toast("Salary structure updated", "success")
  }

  return (
    <div>
      <PH
        title="Salary Management"
        sub="Configure salary components, structures, and employee assignments"
      />
      <TabBar
        tabs={[
          { id: "structures", label: "Salary Structures" },
          { id: "components", label: "Salary Components" },
          { id: "assignment", label: "Employee Assignment" },
        ]}
        active={tab}
        onSelect={(t) => setTab(t as typeof tab)}
      />

      {tab === "structures" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Btn
              variant="secondary"
              onClick={() => toast("Structures exported as CSV", "success")}
            >
              Export
            </Btn>
            <Btn onClick={() => setShowNewSS(true)}>+ New Structure</Btn>
          </div>
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Structure Name</Th>
                  <Th right>Basic</Th>
                  <Th right>HRA</Th>
                  <Th right>Fixed Allow.</Th>
                  <Th right>Special Allow.</Th>
                  <Th right>Monthly Gross</Th>
                  <Th right>Annual CTC</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {ss.map((s) => (
                  <TrH key={s.id}>
                    <Td>
                      <span style={{ fontWeight: 600, color: F.brand }}>
                        {s.name}
                      </span>
                      <div style={{ fontSize: 11, color: F.text3 }}>{s.id}</div>
                    </Td>
                    <Td right>{inr(s.basic)}</Td>
                    <Td right>{inr(s.hra)}</Td>
                    <Td right>{inr(s.fixedAllowance)}</Td>
                    <Td right>{inr(s.specialAllowance)}</Td>
                    <Td right>
                      <strong>{inr(s.gross)}</strong>
                    </Td>
                    <Td right>{inr(s.gross * 12)}</Td>
                    <Td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <Btn
                          small
                          variant="secondary"
                          onClick={() => setEditSS({ ...s })}
                        >
                          Edit
                        </Btn>
                        <Btn
                          small
                          variant="ghost"
                          onClick={() =>
                            toast(`Structure "${s.name}" duplicated`, "info")
                          }
                        >
                          Duplicate
                        </Btn>
                      </div>
                    </Td>
                  </TrH>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "components" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${F.border}`,
                background: F.successBg,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: F.success }}>
                Earnings Components
              </span>
              <Btn
                small
                onClick={() =>
                  toast("Add earnings component - coming soon", "info")
                }
              >
                + Add
              </Btn>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Component</Th>
                  <Th>Type</Th>
                  <Th>Taxable</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Basic", "Fixed", "Yes"],
                  ["HRA", "Fixed", "Partial"],
                  ["Fixed Allowance", "Fixed", "Yes"],
                  ["Bonus", "Variable", "Yes"],
                  ["Commission", "Variable", "Yes"],
                  ["Incentive", "Variable", "Yes"],
                ].map(([n, t, tx]) => (
                  <TrH key={n}>
                    <Td>
                      <span style={{ fontWeight: 500 }}>{n}</span>
                    </Td>
                    <Td>
                      <Badge
                        label={t}
                        color={t === "Fixed" ? F.brand : F.warning}
                        bg={t === "Fixed" ? F.infoBg : F.warningBg}
                      />
                    </Td>
                    <Td>{tx}</Td>
                    <Td>
                      <Btn
                        small
                        variant="ghost"
                        onClick={() => toast(`"${n}" settings opened`, "info")}
                      >
                        Edit
                      </Btn>
                    </Td>
                  </TrH>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${F.border}`,
                background: F.errorBg,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: F.error }}>
                Deduction Components
              </span>
              <Btn
                small
                onClick={() =>
                  toast("Add deduction component - coming soon", "info")
                }
              >
                + Add
              </Btn>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Component</Th>
                  <Th>Calculation</Th>
                  <Th>Statutory</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["PF (Provident Fund)", "12% of Basic", "Yes"],
                  ["ESI", "0.75% of Gross", "Yes"],
                  ["TDS (Income Tax)", "As per slab", "Yes"],
                  ["Professional Tax", "Fixed / State", "Yes"],
                  ["LOP (Loss of Pay)", "Per-day basis", "No"],
                  ["Other Deduction", "Manual", "No"],
                ].map(([n, t, st]) => (
                  <TrH key={n}>
                    <Td>
                      <span style={{ fontWeight: 500 }}>{n}</span>
                    </Td>
                    <Td style={{ fontSize: 11, color: F.text2 }}>{t}</Td>
                    <Td>
                      <Badge
                        label={st}
                        color={st === "Yes" ? F.success : F.text3}
                        bg={st === "Yes" ? F.successBg : F.pageBg}
                      />
                    </Td>
                    <Td>
                      <Btn
                        small
                        variant="ghost"
                        onClick={() => toast(`"${n}" settings opened`, "info")}
                      >
                        Edit
                      </Btn>
                    </Td>
                  </TrH>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "assignment" && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              borderBottom: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: F.text1 }}>
              Employee Salary Assignment
            </span>
            <Btn
              small
              variant="secondary"
              onClick={() => toast("Assignment report exported", "success")}
            >
              Export
            </Btn>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>Employee</Th>
                <Th>Department</Th>
                <Th>Current Structure</Th>
                <Th right>Gross</Th>
                <Th right>PF</Th>
                <Th right>TDS</Th>
                <Th right>Net Approx.</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {emps.map((e) => {
                const s = ss.find((x) => x.name === e.salaryStructure)!
                const pf = s ? Math.round(s.basic * 0.12) : 0
                const tds = Math.round(e.grossSalary * 0.1)
                return (
                  <TrH key={e.id}>
                    <Td>
                      <div style={{ fontWeight: 600 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: F.text3 }}>{e.id}</div>
                    </Td>
                    <Td>{e.department}</Td>
                    <Td>
                      <span style={{ color: F.brand, fontWeight: 600 }}>
                        {e.salaryStructure}
                      </span>
                    </Td>
                    <Td right>{inr(e.grossSalary)}</Td>
                    <Td right style={{ color: F.error }}>
                      {inr(pf)}
                    </Td>
                    <Td right style={{ color: F.error }}>
                      {inr(tds)}
                    </Td>
                    <Td right>
                      <strong>{inr(e.grossSalary - pf - tds - 200)}</strong>
                    </Td>
                    <Td>
                      <Btn
                        small
                        variant="secondary"
                        onClick={() =>
                          toast(
                            `To reassign salary for ${e.name}, use Employees page - Edit`,
                            "info",
                          )
                        }
                      >
                        Reassign
                      </Btn>
                    </Td>
                  </TrH>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showNewSS && (
        <Modal title="New Salary Structure" onClose={() => setShowNewSS(false)}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Structure Name *">
              <input
                style={iSt}
                value={newSS.name}
                onChange={(e) => setNewSS({ ...newSS, name: e.target.value })}
                placeholder="e.g. Lead Engineer"
              />
            </Fld>
            <div />
            <Fld label="Basic (per month)">
              <input
                type="number"
                style={iSt}
                value={newSS.basic || ""}
                onChange={(e) =>
                  setNewSS({ ...newSS, basic: Number(e.target.value) })
                }
              />
            </Fld>
            <Fld label="HRA (per month)">
              <input
                type="number"
                style={iSt}
                value={newSS.hra || ""}
                onChange={(e) =>
                  setNewSS({ ...newSS, hra: Number(e.target.value) })
                }
              />
            </Fld>
            <Fld label="Fixed Allowance (per month)">
              <input
                type="number"
                style={iSt}
                value={newSS.fixedAllowance || ""}
                onChange={(e) =>
                  setNewSS({ ...newSS, fixedAllowance: Number(e.target.value) })
                }
              />
            </Fld>
            <Fld label="Special Allowance (per month)">
              <input
                type="number"
                style={iSt}
                value={newSS.specialAllowance || ""}
                onChange={(e) =>
                  setNewSS({
                    ...newSS,
                    specialAllowance: Number(e.target.value),
                  })
                }
              />
            </Fld>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: F.successBg,
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              color: F.success,
            }}
          >
            Monthly Gross:{" "}
            {inr(
              newSS.basic +
                newSS.hra +
                newSS.fixedAllowance +
                newSS.specialAllowance,
            )}{" "}
            - Annual CTC:{" "}
            {inr(
              (newSS.basic +
                newSS.hra +
                newSS.fixedAllowance +
                newSS.specialAllowance) *
                12,
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 16,
            }}
          >
            <Btn variant="secondary" onClick={() => setShowNewSS(false)}>
              Cancel
            </Btn>
            <Btn onClick={saveNewSS}>Create Structure</Btn>
          </div>
        </Modal>
      )}

      {editSS && (
        <Modal
          title={`Edit Structure - ${editSS.name}`}
          onClose={() => setEditSS(null)}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Structure Name">
              <input
                style={iSt}
                value={editSS.name}
                onChange={(e) => setEditSS({ ...editSS, name: e.target.value })}
              />
            </Fld>
            <div />
            <Fld label="Basic">
              <input
                type="number"
                style={iSt}
                value={editSS.basic}
                onChange={(e) =>
                  setEditSS({ ...editSS, basic: Number(e.target.value) })
                }
              />
            </Fld>
            <Fld label="HRA">
              <input
                type="number"
                style={iSt}
                value={editSS.hra}
                onChange={(e) =>
                  setEditSS({ ...editSS, hra: Number(e.target.value) })
                }
              />
            </Fld>
            <Fld label="Fixed Allowance">
              <input
                type="number"
                style={iSt}
                value={editSS.fixedAllowance}
                onChange={(e) =>
                  setEditSS({
                    ...editSS,
                    fixedAllowance: Number(e.target.value),
                  })
                }
              />
            </Fld>
            <Fld label="Special Allowance">
              <input
                type="number"
                style={iSt}
                value={editSS.specialAllowance}
                onChange={(e) =>
                  setEditSS({
                    ...editSS,
                    specialAllowance: Number(e.target.value),
                  })
                }
              />
            </Fld>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: F.successBg,
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              color: F.success,
            }}
          >
            Monthly Gross:{" "}
            {inr(
              editSS.basic +
                editSS.hra +
                editSS.fixedAllowance +
                editSS.specialAllowance,
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 16,
            }}
          >
            <Btn variant="secondary" onClick={() => setEditSS(null)}>
              Cancel
            </Btn>
            <Btn onClick={saveEditSS}>Save Changes</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

function PayRunsView({
  payruns,
  setPayruns,
  emps,
  ss,
}: {
  payruns: Payrun[]
  setPayruns: React.Dispatch<React.SetStateAction<Payrun[]>>
  emps: Employee[]
  ss: SalaryStructure[]
}) {
  const toast = useToast()
  const [payrollTab, setPayrollTab] = useState<"run" | "history">("run")
  const [activeRunId, setActiveRunId] = useState<string>(
    payruns.find((p) => p.period === "August 2026")?.id || payruns[0]?.id || ""
  )
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(2) // 0: Attendance, 1: Additions, 2: Review, 3: Approval

  // History Filter Bar State (Draft + Applied)
  const [showHistoryFilterBar, setShowHistoryFilterBar] = useState(true)

  const [periodDraft, setPeriodDraft] = useState("")
  const [yearDraft, setYearDraft] = useState("all")
  const [statusDraft, setStatusDraft] = useState("all")
  const [monthDraft, setMonthDraft] = useState("all")
  const [minAmountDraft, setMinAmountDraft] = useState("all")

  const [appliedPeriod, setAppliedPeriod] = useState("")
  const [appliedYear, setAppliedYear] = useState("all")
  const [appliedStatus, setAppliedStatus] = useState("all")
  const [appliedMonth, setAppliedMonth] = useState("all")
  const [appliedMinAmount, setAppliedMinAmount] = useState("all")

  const [selectedHistoryRun, setSelectedHistoryRun] = useState<Payrun | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [newMonth, setNewMonth] = useState(9)
  const [newYear, setNewYear] = useState(2026)

  // Editing Row Modal State
  const [editingRow, setEditingRow] = useState<{
    row: PayrunInputRow
    empName: string
    grossSalary: number
    lopDays: number
    bonus: number
    incentive: number
    tds: number
  } | null>(null)

  const activeRun = payruns.find((p) => p.id === activeRunId) || payruns[0]

  const f4Periods = Array.from(new Set(payruns.map((p) => p.period)))
  const availableYears = Array.from(new Set(payruns.map((p) => String(p.year)))).sort().reverse()

  // Handle Filter Go Action
  const handleHistoryGo = () => {
    setAppliedPeriod(periodDraft)
    setAppliedYear(yearDraft)
    setAppliedStatus(statusDraft)
    setAppliedMonth(monthDraft)
    setAppliedMinAmount(minAmountDraft)
    toast("Payroll history filters applied", "info")
  }

  // Handle Clear History Filters
  const handleHistoryClear = () => {
    setPeriodDraft("")
    setYearDraft("all")
    setStatusDraft("all")
    setMonthDraft("all")
    setMinAmountDraft("all")

    setAppliedPeriod("")
    setAppliedYear("all")
    setAppliedStatus("all")
    setAppliedMonth("all")
    setAppliedMinAmount("all")
    toast("History filters cleared", "info")
  }

  // Filtered History Runs
  const filteredHistory = payruns.filter((p) => {
    if (appliedPeriod && !p.period.toLowerCase().includes(appliedPeriod.toLowerCase())) {
      return false
    }
    if (appliedYear !== "all" && String(p.year) !== appliedYear) {
      return false
    }
    if (appliedStatus !== "all" && p.status !== appliedStatus) {
      return false
    }
    if (appliedMonth !== "all" && String(p.month) !== appliedMonth) {
      return false
    }
    if (appliedMinAmount !== "all") {
      const minVal = Number(appliedMinAmount)
      if (p.netPayroll < minVal) return false
    }
    return true
  })

  // Advance payrun status in lifecycle
  const advanceRunStatus = (pr: Payrun) => {
    const statusMap: Record<PayrunStatus, PayrunStatus> = {
      Draft: "Calculated",
      Calculated: "Under Review",
      "Under Review": "Approved",
      Approved: "Completed",
      Completed: "Completed",
    }
    const nextStatus = statusMap[pr.status]
    const updatedDate = nextStatus === "Completed" ? new Date().toISOString().slice(0, 10) : pr.generatedOn

    setPayruns((prev) =>
      prev.map((item) =>
        item.id === pr.id
          ? {
              ...item,
              status: nextStatus,
              generatedOn: updatedDate,
            }
          : item
      )
    )

    if (nextStatus === "Calculated") setCurrentStepIndex(1)
    if (nextStatus === "Under Review") setCurrentStepIndex(2)
    if (nextStatus === "Approved" || nextStatus === "Completed") setCurrentStepIndex(3)

    toast(`Pay run ${pr.period} updated to "${nextStatus}"`, "success")
  }

  // Recalculate all employees in the active payrun
  const handleRecalculate = () => {
    if (!activeRun) return
    const newRows = calcRows(emps, ss)
    const gross = newRows.reduce((s, r) => s + r.totalEarnings, 0)
    const deductions = newRows.reduce((s, r) => s + r.totalDeductions, 0)

    setPayruns((prev) =>
      prev.map((p) =>
        p.id === activeRun.id
          ? {
              ...p,
              grossPayroll: gross,
              totalDeductions: deductions,
              netPayroll: gross - deductions,
              rows: newRows,
              totalEmployees: newRows.length,
            }
          : p
      )
    )
    toast(`Recalculated salary figures for ${newRows.length} employees`, "success")
  }

  // Save Row Edits
  const handleSaveRow = () => {
    if (!editingRow || !activeRun) return

    const perDayGross = editingRow.grossSalary / 30
    const lopDeduction = Math.round(perDayGross * editingRow.lopDays)
    const totalEarnings = editingRow.grossSalary + editingRow.bonus + editingRow.incentive
    const pf = Math.round(editingRow.grossSalary * 0.12 * 0.5) // ~12% of basic
    const profTax = 200
    const totalDeductions = lopDeduction + pf + editingRow.tds + profTax
    const netSalary = Math.max(0, totalEarnings - totalDeductions)

    const updatedRows = activeRun.rows.map((r) => {
      if (r.empId === editingRow.row.empId) {
        return {
          ...r,
          grossSalary: editingRow.grossSalary,
          lopDays: editingRow.lopDays,
          lopDeduction,
          bonus: editingRow.bonus,
          incentive: editingRow.incentive,
          tds: editingRow.tds,
          pf,
          profTax,
          totalEarnings,
          totalDeductions,
          netSalary,
        }
      }
      return r
    })

    const newGross = updatedRows.reduce((s, r) => s + r.totalEarnings, 0)
    const newDeductions = updatedRows.reduce((s, r) => s + r.totalDeductions, 0)

    setPayruns((prev) =>
      prev.map((p) =>
        p.id === activeRun.id
          ? {
              ...p,
              grossPayroll: newGross,
              totalDeductions: newDeductions,
              netPayroll: newGross - newDeductions,
              rows: updatedRows,
            }
          : p
      )
    )

    setEditingRow(null)
    toast(`Updated salary row for ${editingRow.empName}`, "success")
  }

  // Create new payrun
  const handleCreatePayrun = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const periodName = `${monthNames[newMonth - 1]} ${newYear}`
    if (payruns.some((p) => p.period === periodName)) {
      return toast(`Pay run for ${periodName} already exists`, "error")
    }

    const rows = calcRows(emps, ss)
    const gross = rows.reduce((s, r) => s + r.totalEarnings, 0)
    const deductions = rows.reduce((s, r) => s + r.totalDeductions, 0)

    const newPr: Payrun = {
      id: `PR-${newYear}-${String(newMonth).padStart(2, "0")}`,
      period: periodName,
      month: newMonth,
      year: newYear,
      status: "Draft",
      totalEmployees: emps.length,
      grossPayroll: gross,
      totalDeductions: deductions,
      netPayroll: gross - deductions,
      generatedBy: "Meena Iyer",
      generatedOn: new Date().toISOString().slice(0, 10),
      rows,
    }

    setPayruns([newPr, ...payruns])
    setActiveRunId(newPr.id)
    setShowNewModal(false)
    setCurrentStepIndex(0)
    toast(`New Pay run for ${periodName} initialized`, "success")
  }

  // Export Bank Batch CSV
  const handleExportBankBatch = () => {
    if (!activeRun) return
    const csvContent =
      "Employee ID,Employee Name,Account Number,IFSC Code,Net Salary,Payment Period\n" +
      activeRun.rows
        .map(
          (r, i) =>
            `${r.empId},${r.empName},918273645${i + 10},HDFC0001234,${r.netSalary},${activeRun.period}`
        )
        .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `Bank_Disbursement_Batch_${activeRun.period.replace(" ", "_")}.csv`
    a.click()
    toast("Bank disbursement batch file generated", "success")
  }

  const currentNetPay = activeRun ? activeRun.netPayroll : 0
  const currentGross = activeRun ? activeRun.grossPayroll : 0
  const currentDeductions = activeRun ? activeRun.totalDeductions : 0
  const currentEmpCount = activeRun ? activeRun.totalEmployees : 0
  const historyActiveFiltersCount =
    (appliedPeriod ? 1 : 0) +
    (appliedYear !== "all" ? 1 : 0) +
    (appliedStatus !== "all" ? 1 : 0) +
    (appliedMonth !== "all" ? 1 : 0) +
    (appliedMinAmount !== "all" ? 1 : 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            Payroll & Pay Runs
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Execute, verify, approve, and disburse monthly employee compensation
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn onClick={() => setShowNewModal(true)}>+ Create Pay Run</Btn>
          <Btn variant="secondary" onClick={handleRecalculate}>
            Recalculate All
          </Btn>
          <Btn variant="secondary" onClick={handleExportBankBatch}>
            Export Bank Batch
          </Btn>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <EmployeeMetricCard
          label="Active Pay Cycle"
          value={activeRun ? activeRun.period : "None"}
          sub={activeRun ? `Status: ${activeRun.status}` : "No active run"}
          accent={F.brand}
          badgeText={activeRun ? activeRun.status : "Draft"}
          badgeBg={F.infoBg}
          badgeColor={F.brand}
          progress={75}
        />
        <EmployeeMetricCard
          label="Total Net Payroll"
          value={inr(currentNetPay)}
          sub={`From ${inr(currentGross)} gross compensation`}
          accent={F.success}
          badgeText="Net Payable"
          badgeBg={F.successBg}
          badgeColor={F.success}
          progress={currentGross > 0 ? Math.round((currentNetPay / currentGross) * 100) : 0}
        />
        <EmployeeMetricCard
          label="Statutory Deductions"
          value={inr(currentDeductions)}
          sub="PF (12%), TDS Withholdings & PT"
          accent={F.warning}
          badgeText="Withholdings"
          badgeBg={F.warningBg}
          badgeColor={F.warning}
          progress={currentGross > 0 ? Math.round((currentDeductions / currentGross) * 100) : 0}
        />
        <EmployeeMetricCard
          label="Eligible Employees"
          value={`${currentEmpCount} Employees`}
          sub="100% attendance & compensation verified"
          accent="#8B5CF6"
          badgeText="Verified"
          badgeBg="#F5F3FF"
          badgeColor="#7C3AED"
          progress={100}
        />
      </div>

      {/* Tabs Header in Fiori Style */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${F.border}`,
          gap: 24,
        }}
      >
        <button
          onClick={() => setPayrollTab("run")}
          style={{
            background: "none",
            border: "none",
            borderBottom: `3px solid ${payrollTab === "run" ? F.brand : "transparent"}`,
            padding: "10px 4px",
            fontSize: 13,
            fontWeight: payrollTab === "run" ? 700 : 500,
            color: payrollTab === "run" ? F.brand : F.text2,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          Active Pay Run Processing
        </button>
        <button
          onClick={() => setPayrollTab("history")}
          style={{
            background: "none",
            border: "none",
            borderBottom: `3px solid ${payrollTab === "history" ? F.brand : "transparent"}`,
            padding: "10px 4px",
            fontSize: 13,
            fontWeight: payrollTab === "history" ? 700 : 500,
            color: payrollTab === "history" ? F.brand : F.text2,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          Payroll History & Audit Ledger
        </button>
      </div>

      {/* TAB 1: RUN PAYROLL */}
      {payrollTab === "run" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Active Payrun Selector Bar */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                Select Active Pay Run:
              </span>
              <select
                value={activeRun?.id}
                onChange={(e) => setActiveRunId(e.target.value)}
                style={{ ...iSt, width: 220, cursor: "pointer", fontWeight: 700 }}
              >
                {payruns.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.period} ({pr.status})
                  </option>
                ))}
              </select>
            </div>

            {activeRun && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: F.text2 }}>Current Status:</span>
                {prBadge(activeRun.status)}
              </div>
            )}
          </div>

          {/* Interactive 4-Stage Workflow Stepper */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              padding: "16px 20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase", marginBottom: 12 }}>
              Interactive Payroll Process Workflow
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              {[
                { title: "1. Attendance & LOP", step: 0 },
                { title: "2. Additions & Bonuses", step: 1 },
                { title: "3. Review Calculations", step: 2 },
                { title: "4. Approval & Disbursement", step: 3 },
              ].map((s, i) => {
                const isCurrent = currentStepIndex === s.step
                const isPassed = currentStepIndex > s.step

                return (
                  <div
                    key={i}
                    onClick={() => setCurrentStepIndex(s.step)}
                    style={{
                      flex: 1,
                      background: isCurrent ? F.infoBg : F.pageBg,
                      border: `1px solid ${isCurrent ? F.brand : F.border}`,
                      borderRadius: 6,
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: isCurrent ? F.brand : F.text1 }}>
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: isPassed ? F.success : isCurrent ? F.brand : F.text3,
                        background: F.card,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      {isPassed ? "Completed" : isCurrent ? "Active" : "Pending"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Notification Strip */}
          <div
            style={{
              background: activeRun?.status === "Completed" ? F.successBg : F.warningBg,
              border: `1px solid ${activeRun?.status === "Completed" ? F.success : F.warning}40`,
              borderLeft: `4px solid ${activeRun?.status === "Completed" ? F.success : F.warning}`,
              borderRadius: 8,
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <strong style={{ color: F.text1, fontSize: 13 }}>
                Pay Run: {activeRun ? activeRun.period : "August 2026"} &bull; Stage: {activeRun?.status}
              </strong>
              <div style={{ color: F.text2, fontSize: 12, marginTop: 2 }}>
                {activeRun?.status === "Completed"
                  ? "Disbursement completed. All employee payslips are finalized."
                  : "Click 'Advance Status' to progress to the next verification or final disbursement stage."}
              </div>
            </div>
            {activeRun && activeRun.status !== "Completed" && (
              <Btn onClick={() => advanceRunStatus(activeRun)}>
                Advance Status ({activeRun.status}) &rarr;
              </Btn>
            )}
          </div>

          {/* Employee Pay Run Sheet Table */}
          {activeRun && (
            <div
              style={{
                background: F.card,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: `1px solid ${F.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                    Employee Pay Sheet &mdash; {activeRun.period}
                  </h2>
                  <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                    Click "Edit" on any employee to adjust LOP, bonus, tax withholdings, or custom additions
                  </div>
                </div>
                {prBadge(activeRun.status)}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: `1px solid ${F.border}`,
                        background: F.pageBg,
                        color: F.text2,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      <th style={{ padding: "10px 18px", textAlign: "left" }}>Employee</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>Department</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>Gross Salary</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>LOP Days</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>LOP Ded.</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>Bonus / Add.</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>EPF (12%)</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>TDS Tax</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>Net Salary</th>
                      <th style={{ padding: "10px 18px", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRun.rows.map((row) => (
                      <tr
                        key={row.empId}
                        style={{
                          borderBottom: `1px solid ${F.border}60`,
                          transition: "background 0.12s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = F.pageBg)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: F.text1 }}>{row.empName}</strong>
                          <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                            ID: {row.empId}
                          </div>
                        </td>
                        <td style={{ padding: "14px 14px", color: F.text2 }}>{row.department}</td>
                        <td style={{ padding: "14px 14px", textAlign: "right", fontWeight: 600, color: F.text1 }}>
                          {inr(row.grossSalary)}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", color: row.lopDays > 0 ? F.error : F.text3 }}>
                          {row.lopDays} d
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", color: row.lopDeduction > 0 ? F.error : F.text3 }}>
                          {inr(row.lopDeduction)}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", color: (row.bonus + row.incentive) > 0 ? F.brand : F.text3 }}>
                          +{inr(row.bonus + row.incentive)}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", color: F.text2 }}>
                          {inr(row.pf)}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning }}>
                          {inr(row.tds)}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "right", fontWeight: 800, color: F.success, fontSize: 14 }}>
                          {inr(row.netSalary)}
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <Btn
                            small
                            variant="secondary"
                            onClick={() =>
                              setEditingRow({
                                row,
                                empName: row.empName,
                                grossSalary: row.grossSalary,
                                lopDays: row.lopDays,
                                bonus: row.bonus,
                                incentive: row.incentive,
                                tds: row.tds,
                              })
                            }
                          >
                            Edit
                          </Btn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: F.pageBg, borderTop: `2px solid ${F.border}`, fontWeight: 800 }}>
                      <td style={{ padding: "14px 18px", color: F.text1 }} colSpan={2}>
                        Total Summary ({activeRun.rows.length} Employees)
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right", color: F.brand }}>
                        {inr(activeRun.grossPayroll)}
                      </td>
                      <td colSpan={3} />
                      <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning }} colSpan={2}>
                        Total Deductions: {inr(activeRun.totalDeductions)}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right", color: F.success, fontSize: 15 }}>
                        {inr(activeRun.netPayroll)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PAYROLL HISTORY WITH SAP FIORI FILTER BAR */}
      {payrollTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* SAP Fiori Collapsible Filter Bar Panel */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              overflow: "hidden",
            }}
          >
            {/* Filter Bar Action Bar Header */}
            <div
              style={{
                padding: "12px 18px",
                borderBottom: showHistoryFilterBar ? `1px solid ${F.border}` : "none",
                background: F.card,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
                  Payroll History Filter Bar
                </span>
                {historyActiveFiltersCount > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: F.brand,
                      background: F.infoBg,
                      padding: "2px 8px",
                      borderRadius: 12,
                    }}
                  >
                    {historyActiveFiltersCount} Active Filter{historyActiveFiltersCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Action Buttons: Go, Clear Filters, Hide/Show Filter Bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Btn onClick={handleHistoryGo} style={{ height: 34, padding: "0 18px", fontWeight: 700 }}>
                  Go
                </Btn>
                <Btn variant="secondary" onClick={handleHistoryClear} style={{ height: 34 }}>
                  Clear Filters
                </Btn>
                <Btn
                  variant="secondary"
                  onClick={() => setShowHistoryFilterBar(!showHistoryFilterBar)}
                  style={{ height: 34 }}
                >
                  {showHistoryFilterBar ? "Hide Filter Bar" : "Show Filter Bar"}
                </Btn>
              </div>
            </div>

            {/* Collapsible Filter Inputs Grid */}
            {showHistoryFilterBar && (
              <div
                style={{
                  padding: "16px 18px",
                  background: F.card,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 14,
                  alignItems: "flex-end",
                }}
              >
                {/* 1. Search Pay Period (F4 Search) */}
                <div style={{ gridColumn: "span 2", minWidth: 260 }}>
                  <ValueHelp
                    label="Search Pay Period (F4 Search)"
                    value={periodDraft}
                    onChange={setPeriodDraft}
                    placeholder="Search pay period (press Go to apply)…"
                    values={f4Periods}
                  />
                </div>

                {/* 2. Year Filter */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: F.text2,
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Year
                  </div>
                  <select
                    value={yearDraft}
                    onChange={(e) => setYearDraft(e.target.value)}
                    style={{ ...iSt, cursor: "pointer" }}
                  >
                    <option value="all">All Years</option>
                    {availableYears.map((yr) => (
                      <option key={yr} value={yr}>
                        Year {yr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Run Status Filter */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: F.text2,
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Run Status
                  </div>
                  <select
                    value={statusDraft}
                    onChange={(e) => setStatusDraft(e.target.value)}
                    style={{ ...iSt, cursor: "pointer" }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Approved">Approved</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Draft">Draft</option>
                    <option value="Calculated">Calculated</option>
                  </select>
                </div>

                {/* 4. Month Filter */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: F.text2,
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Month
                  </div>
                  <select
                    value={monthDraft}
                    onChange={(e) => setMonthDraft(e.target.value)}
                    style={{ ...iSt, cursor: "pointer" }}
                  >
                    <option value="all">All Months</option>
                    {[
                      [1, "Jan"], [2, "Feb"], [3, "Mar"], [4, "Apr"],
                      [5, "May"], [6, "Jun"], [7, "Jul"], [8, "Aug"],
                      [9, "Sep"], [10, "Oct"], [11, "Nov"], [12, "Dec"]
                    ].map(([mNum, mName]) => (
                      <option key={mNum} value={String(mNum)}>
                        {mName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Minimum Amount Filter */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: F.text2,
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Min Net Amount
                  </div>
                  <select
                    value={minAmountDraft}
                    onChange={(e) => setMinAmountDraft(e.target.value)}
                    style={{ ...iSt, cursor: "pointer" }}
                  >
                    <option value="all">All Amounts</option>
                    <option value="500000">&gt; ₹5,00,000</option>
                    <option value="800000">&gt; ₹8,00,000</option>
                    <option value="1000000">&gt; ₹10,00,000</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* History Ledger Table */}
          <div
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${F.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                  Payroll History & Audit Records
                </h2>
                <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                  Showing {filteredHistory.length} of {payruns.length} recorded payroll cycles
                </div>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, fontSize: 13 }}>
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${F.border}`,
                    background: F.pageBg,
                    color: F.text2,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  <th style={{ padding: "12px 18px", textAlign: "left" }}>Pay Period</th>
                  <th style={{ padding: "12px 14px", textAlign: "left" }}>Payment Date</th>
                  <th style={{ padding: "12px 14px", textAlign: "center" }}>Employees</th>
                  <th style={{ padding: "12px 14px", textAlign: "right" }}>Gross Payroll</th>
                  <th style={{ padding: "12px 14px", textAlign: "right" }}>Deductions</th>
                  <th style={{ padding: "12px 14px", textAlign: "right" }}>Net Disbursed</th>
                  <th style={{ padding: "12px 14px", textAlign: "center" }}>Status</th>
                  <th style={{ padding: "12px 18px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: 44, textAlign: "center", color: F.text3 }}>
                      No historical payroll records match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((pr) => (
                    <tr
                      key={pr.id}
                      onClick={() => setSelectedHistoryRun(pr)}
                      style={{
                        borderBottom: `1px solid ${F.border}60`,
                        cursor: "pointer",
                        transition: "background 0.12s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = F.pageBg)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ fontWeight: 800, color: F.text1 }}>{pr.period}</div>
                        <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                          Ref: {pr.id}
                        </div>
                      </td>
                      <td style={{ padding: "14px 14px", color: F.text2 }}>
                        {fmtD(pr.generatedOn)}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "center", fontWeight: 600 }}>
                        {pr.totalEmployees}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right", color: F.text2, fontWeight: 600 }}>
                        {inr(pr.grossPayroll)}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning, fontWeight: 600 }}>
                        {inr(pr.totalDeductions)}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right", fontWeight: 800, color: F.success, fontSize: 14 }}>
                        {inr(pr.netPayroll)}
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "center" }}>
                        {prBadge(pr.status)}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <Btn small variant="secondary" onClick={() => setSelectedHistoryRun(pr)}>
                          Details &rarr;
                        </Btn>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Employee Row Modal */}
      {editingRow && (
        <Modal title={`Edit Salary Row — ${editingRow.empName}`} onClose={() => setEditingRow(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 13, color: F.text2 }}>
              Adjust salary, attendance LOP, bonuses, and tax withholdings for this payroll run.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Fld label="Gross Base Salary (₹)">
                <input
                  type="number"
                  value={editingRow.grossSalary}
                  onChange={(e) => setEditingRow({ ...editingRow, grossSalary: Number(e.target.value) })}
                  style={iSt}
                />
              </Fld>

              <Fld label="Loss of Pay (LOP Days)">
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={editingRow.lopDays}
                  onChange={(e) => setEditingRow({ ...editingRow, lopDays: Number(e.target.value) })}
                  style={iSt}
                />
              </Fld>

              <Fld label="Bonus (₹)">
                <input
                  type="number"
                  value={editingRow.bonus}
                  onChange={(e) => setEditingRow({ ...editingRow, bonus: Number(e.target.value) })}
                  style={iSt}
                />
              </Fld>

              <Fld label="Performance Incentive (₹)">
                <input
                  type="number"
                  value={editingRow.incentive}
                  onChange={(e) => setEditingRow({ ...editingRow, incentive: Number(e.target.value) })}
                  style={iSt}
                />
              </Fld>

              <Fld label="Income Tax TDS (₹)">
                <input
                  type="number"
                  value={editingRow.tds}
                  onChange={(e) => setEditingRow({ ...editingRow, tds: Number(e.target.value) })}
                  style={iSt}
                />
              </Fld>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <Btn variant="secondary" onClick={() => setEditingRow(null)}>
                Cancel
              </Btn>
              <Btn onClick={handleSaveRow}>Save & Recalculate</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* Create New Payrun Modal */}
      {showNewModal && (
        <Modal title="Create New Pay Run" onClose={() => setShowNewModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 13, color: F.text2 }}>
              Initialize a new monthly salary pay run cycle. Employee counts and deductions will be calculated automatically.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Fld label="Select Month">
                <select
                  value={newMonth}
                  onChange={(e) => setNewMonth(Number(e.target.value))}
                  style={{ ...iSt, cursor: "pointer" }}
                >
                  {[
                    [1, "January"], [2, "February"], [3, "March"], [4, "April"],
                    [5, "May"], [6, "June"], [7, "July"], [8, "August"],
                    [9, "September"], [10, "October"], [11, "November"], [12, "December"]
                  ].map(([num, name]) => (
                    <option key={num} value={num}>
                      {name}
                    </option>
                  ))}
                </select>
              </Fld>

              <Fld label="Select Year">
                <select
                  value={newYear}
                  onChange={(e) => setNewYear(Number(e.target.value))}
                  style={{ ...iSt, cursor: "pointer" }}
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                </select>
              </Fld>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <Btn variant="secondary" onClick={() => setShowNewModal(false)}>
                Cancel
              </Btn>
              <Btn onClick={handleCreatePayrun}>Generate Pay Run</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* Payrun Details SlidePanel */}
      {selectedHistoryRun && (
        <SlidePanel
          title={`Pay Run Ledger — ${selectedHistoryRun.period}`}
          sub={`Generated by ${selectedHistoryRun.generatedBy} on ${fmtD(selectedHistoryRun.generatedOn)}`}
          onClose={() => setSelectedHistoryRun(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: F.pageBg,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase" }}>
                  Net Disbursed Payroll
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: F.success, marginTop: 2 }}>
                  {inr(selectedHistoryRun.netPayroll)}
                </div>
              </div>
              {prBadge(selectedHistoryRun.status)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Gross Payroll:</span>
                <strong>{inr(selectedHistoryRun.grossPayroll)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Total Deductions:</span>
                <strong style={{ color: F.warning }}>{inr(selectedHistoryRun.totalDeductions)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Total Employees:</span>
                <strong>{selectedHistoryRun.totalEmployees} Employees</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
              <Btn variant="secondary" onClick={() => setSelectedHistoryRun(null)}>
                Close
              </Btn>
              {selectedHistoryRun.status !== "Completed" && (
                <Btn onClick={() => advanceRunStatus(selectedHistoryRun)}>
                  Advance Status ({selectedHistoryRun.status}) &rarr;
                </Btn>
              )}
            </div>
          </div>
        </SlidePanel>
      )}
    </div>
  )
}

function PayslipsView({
  emps,
  payruns,
  myEmp,
}: {
  emps: Employee[]
  payruns: Payrun[]
  myEmp?: Employee
}) {
  const toast = useToast()
  const [empSearch, setEmpSearch] = useState(myEmp?.name ?? "")
  const [selPeriod, setSelPeriod] = useState("All")
  const [deptF, setDeptF] = useState("All")
  const [typeF, setTypeF] = useState("All")
  const [netMin, setNetMin] = useState("")
  const [netMax, setNetMax] = useState("")
  const [sortBy, setSortBy] = useState<"period" | "net" | "gross">("period")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showAdv, setShowAdv] = useState(false)
  const [viewSlip, setViewSlip] = useState<{
    row: PayrunInputRow
    run: Payrun
  } | null>(null)

  const completed = payruns.filter((p) => p.status === "Completed")
  const depts = ["All", ...Array.from(new Set(emps.map((e) => e.department)))]
  const empNames = emps.map((e) => e.name)

  const allRows: { row: PayrunInputRow run: Payrun emp: Employee }[] = []
  completed.forEach((run) =>
    run.rows.forEach((row) => {
      const emp = emps.find((e) => e.id === row.empId)
      if (emp) allRows.push({ row, run, emp })
    }),
  )

  const rows = allRows
    .filter(({ row, run, emp: e }) => {
      const q = empSearch.toLowerCase().replace(/ *\(.*\)$/, "")
      const nameMatch = myEmp
        ? e.id === myEmp.id
        : !q ||
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q)
      return (
        nameMatch &&
        (selPeriod === "All" || run.period === selPeriod) &&
        (deptF === "All" || e.department === deptF) &&
        (typeF === "All" || e.empType === typeF) &&
        (!netMin || row.netSalary >= parseInt(netMin) * 1000) &&
        (!netMax || row.netSalary <= parseInt(netMax) * 1000)
      )
    })
    .sort((a, b) => {
      let d = 0
      if (sortBy === "net") d = a.row.netSalary - b.row.netSalary
      else if (sortBy === "gross") d = a.row.totalEarnings - b.row.totalEarnings
      else d = a.run.year * 100 + a.run.month - (b.run.year * 100 + b.run.month)
      return sortDir === "asc" ? d : -d
    })

  const activeFilters =
    [selPeriod, deptF, typeF].filter((v) => v !== "All").length +
    (netMin ? 1 : 0) +
    (netMax ? 1 : 0)
  const clearAll = () => {
    setEmpSearch(myEmp?.name ?? "")
    setSelPeriod("All")
    setDeptF("All")
    setTypeF("All")
    setNetMin("")
    setNetMax("")
  }

  const SortTh = ({
    col,
    children,
  }: {
    col: "period" | "net" | "gross"
    children: React.ReactNode
  }) => (
    <th
      onClick={() => {
        if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        else {
          setSortBy(col)
          setSortDir("desc")
        }
      }}
      style={{
        padding: "9px 14px",
        textAlign: "right",
        fontSize: 11,
        fontWeight: 600,
        color: sortBy === col ? F.brand : F.text2,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        borderBottom: `1px solid ${F.border}`,
        whiteSpace: "nowrap",
        background: F.pageBg,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {children} {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </th>
  )

  return (
    <div>
      <PH
        title={myEmp ? "My Payslips" : "Payslips"}
        sub={`${rows.length} payslip${
          rows.length !== 1 ? "s" : ""
        } found · Naxrita Solutions`}
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn
              variant="secondary"
              onClick={() => toast("All payslips exported as ZIP", "success")}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export All
            </Btn>
          </div>
        }
      />

      {/* Primary filters row */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        {!myEmp && (
          <ValueHelp
            value={empSearch}
            onChange={setEmpSearch}
            placeholder="Search employee name or ID…"
            values={empNames}
          />
        )}
        <select
          value={selPeriod}
          onChange={(e) => setSelPeriod(e.target.value)}
          style={{ ...iSt, width: 180 }}
        >
          <option value="All">All Periods</option>
          {completed.map((r) => (
            <option key={r.id}>{r.period}</option>
          ))}
        </select>
        {!myEmp && (
          <select
            value={deptF}
            onChange={(e) => setDeptF(e.target.value)}
            style={{ ...iSt, width: 160 }}
          >
            {depts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        )}
        <button
          onClick={() => setShowAdv((v) => !v)}
          style={{
            padding: "7px 14px",
            background: showAdv || activeFilters > 0 ? F.infoBg : F.card,
            border: `1px solid ${activeFilters > 0 ? F.brand : F.border}`,
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: activeFilters > 0 ? F.brand : F.text2,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          More Filters{" "}
          {activeFilters > 0 && (
            <span
              style={{
                background: F.brand,
                color: "#fff",
                borderRadius: 10,
                padding: "0 6px",
                fontSize: 11,
              }}
            >
              {activeFilters}
            </span>
          )}
        </button>
        {(activeFilters > 0 || (empSearch && !myEmp)) && (
          <button
            onClick={clearAll}
            style={{
              padding: "7px 12px",
              background: F.errorBg,
              border: `1px solid #e8b4b4`,
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: F.error,
              fontFamily: "inherit",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdv && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "14px 18px",
            marginBottom: 10,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: 12,
          }}
        >
          <Fld label="Employment Type">
            <select
              value={typeF}
              onChange={(e) => setTypeF(e.target.value)}
              style={iSt}
            >
              {["All", "Full-Time", "Part-Time", "Contract"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Fld>
          <Fld label="Min Net Pay (₹K)">
            <input
              type="number"
              value={netMin}
              onChange={(e) => setNetMin(e.target.value)}
              placeholder="e.g. 40"
              style={iSt}
            />
          </Fld>
          <Fld label="Max Net Pay (₹K)">
            <input
              type="number"
              value={netMax}
              onChange={(e) => setNetMax(e.target.value)}
              placeholder="e.g. 200"
              style={iSt}
            />
          </Fld>
        </div>
      )}

      {/* Active filter pills */}
      {activeFilters > 0 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          {selPeriod !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Period: {selPeriod}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setSelPeriod("All")}
              >
                ×
              </span>
            </span>
          )}
          {deptF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Dept: {deptF}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setDeptF("All")}
              >
                ×
              </span>
            </span>
          )}
          {typeF !== "All" && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Type: {typeF}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setTypeF("All")}
              >
                ×
              </span>
            </span>
          )}
          {netMin && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Net ≥ ₹{netMin}K{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setNetMin("")}>
                ×
              </span>
            </span>
          )}
          {netMax && (
            <span
              style={{
                padding: "3px 10px 3px 8px",
                background: F.infoBg,
                border: `1px solid ${F.brand}40`,
                borderRadius: 12,
                fontSize: 12,
                color: F.brand,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Net ≤ ₹{netMax}K{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setNetMax("")}>
                ×
              </span>
            </span>
          )}
        </div>
      )}

      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {!myEmp && <Th>Employee</Th>}
              {!myEmp && <Th>Department</Th>}
              <Th>Pay Period</Th>
              <SortTh col="gross">Gross Earnings</SortTh>
              <SortTh col="net">Net Pay</SortTh>
              <Th right>Deductions</Th>
              <Th>PF</Th>
              <Th>TDS</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{ padding: 48, textAlign: "center", color: F.text3 }}
                >
                  No payslips match the selected filters.
                </td>
              </tr>
            )}
            {rows.map(({ row, run, emp: e }) => (
              <TrH
                key={`${run.id}-${row.empId}`}
                onClick={() => setViewSlip({ row, run })}
              >
                {!myEmp && (
                  <Td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: F.brand,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {e.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>
                          {e.name}
                        </div>
                        <div style={{ fontSize: 11, color: F.text3 }}>
                          {e.id}
                        </div>
                      </div>
                    </div>
                  </Td>
                )}
                {!myEmp && (
                  <Td>
                    <span style={{ fontSize: 12 }}>{e.department}</span>
                  </Td>
                )}
                <Td>
                  <span style={{ fontWeight: 600 }}>{run.period}</span>
                </Td>
                <Td right>{inr(row.totalEarnings)}</Td>
                <Td right>
                  <strong style={{ color: F.success, fontSize: 14 }}>
                    {inr(row.netSalary)}
                  </strong>
                </Td>
                <Td right style={{ color: F.error }}>
                  {inr(row.totalDeductions)}
                </Td>
                <Td>
                  <span style={{ fontSize: 12 }}>{inr(row.pf)}</span>
                </Td>
                <Td>
                  <span style={{ fontSize: 12 }}>{inr(row.tds)}</span>
                </Td>
                <Td>{prBadge("Completed")}</Td>
                <Td>
                  <div
                    style={{ display: "flex", gap: 6 }}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <Btn
                      small
                      variant="secondary"
                      onClick={() => setViewSlip({ row, run })}
                    >
                      View
                    </Btn>
                    <Btn
                      small
                      variant="ghost"
                      onClick={() =>
                        toast(
                          `Payslip for ${e.name} - ${run.period} downloaded`,
                          "success",
                        )
                      }
                    >
                      PDF
                    </Btn>
                  </div>
                </Td>
              </TrH>
            ))}
          </tbody>
        </table>
      </div>
      {viewSlip && (
        <Modal
          title={`Payslip - ${viewSlip.run.period}`}
          onClose={() => setViewSlip(null)}
          wide
        >
          <PayslipSheet
            row={viewSlip.row}
            run={viewSlip.run}
            emp={emps.find((e) => e.id === viewSlip.row.empId)!}
            onDownload={() => toast("Payslip PDF downloaded", "success")}
          />
        </Modal>
      )}
    </div>
  )
}

function ReportsView({
  emps,
  ss,
  payruns,
}: {
  emps: Employee[]
  ss: SalaryStructure[]
  payruns: Payrun[]
}) {
  const toast = useToast()
  const [active, setActive] = useState("payroll_summary")
  const [period, setPeriod] = useState("July 2026")
  const completedPeriods = payruns
    .filter((p) => p.status === "Completed")
    .map((p) => p.period)
  const pr =
    payruns.find((p) => p.period === period && p.status === "Completed") ??
    payruns.find((p) => p.status === "Completed")
  const REPORT_LIST = [
    { id: "payroll_summary", label: "Payroll Summary" },
    { id: "employee_payroll", label: "Employee Payroll" },
    { id: "earnings", label: "Earnings Report" },
    { id: "deductions", label: "Deductions Report" },
    { id: "lop", label: "LOP Report" },
    { id: "payslip", label: "Payslip Report" },
  ]

  return (
    <div>
      <PH
        title="Reports"
        sub="Payroll, earnings, deduction, and LOP reports"
        action={
          <Btn
            variant="secondary"
            onClick={() => toast("All reports exported", "success")}
          >
            Export All
          </Btn>
        }
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}
      >
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 4,
          }}
        >
          {REPORT_LIST.map((r) => (
            <div
              key={r.id}
              onClick={() => setActive(r.id)}
              style={{
                padding: "11px 16px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: active === r.id ? 600 : 400,
                color: active === r.id ? F.brand : F.text1,
                background: active === r.id ? F.highlight : "transparent",
                borderLeft: `3px solid ${
                  active === r.id ? F.brand : "transparent"
                }`,
                borderBottom: `1px solid ${F.border}`,
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              borderBottom: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: F.text1 }}>
              {REPORT_LIST.find((r) => r.id === active)?.label}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{ ...iSt, width: 160 }}
              >
                {completedPeriods.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <Btn
                small
                onClick={() =>
                  toast(
                    `${REPORT_LIST.find((r) => r.id === active)?.label} exported`,
                    "success",
                  )
                }
              >
                Export CSV
              </Btn>
            </div>
          </div>
          {!pr && (
            <div
              style={{
                padding: 32,
                textAlign: "center",
                color: F.text3,
                fontSize: 13,
              }}
            >
              No completed pay runs for the selected period.
            </div>
          )}
          {pr &&
            (active === "payroll_summary" || active === "employee_payroll") && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <Th>Employee</Th>
                    <Th>Department</Th>
                    <Th right>Gross</Th>
                    <Th right>Bonus</Th>
                    <Th right>Total Earnings</Th>
                    <Th right>Total Deductions</Th>
                    <Th right>Net Salary</Th>
                  </tr>
                </thead>
                <tbody>
                  {pr.rows.map((r) => (
                    <TrH key={r.empId}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{r.empName}</div>
                        <div style={{ fontSize: 11, color: F.text3 }}>
                          {r.empId}
                        </div>
                      </Td>
                      <Td>{r.department}</Td>
                      <Td right>{inr(r.grossSalary)}</Td>
                      <Td
                        right
                        style={{ color: r.bonus > 0 ? F.success : F.text3 }}
                      >
                        {r.bonus > 0 ? inr(r.bonus) : "--"}
                      </Td>
                      <Td right>{inr(r.totalEarnings)}</Td>
                      <Td right style={{ color: F.error }}>
                        {inr(r.totalDeductions)}
                      </Td>
                      <Td right>
                        <strong style={{ color: F.success }}>
                          {inr(r.netSalary)}
                        </strong>
                      </Td>
                    </TrH>
                  ))}
                </tbody>
              </table>
            )}
          {pr && active === "deductions" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Employee</Th>
                  <Th right>PF</Th>
                  <Th right>ESI</Th>
                  <Th right>TDS</Th>
                  <Th right>Prof. Tax</Th>
                  <Th right>LOP Ded.</Th>
                  <Th right>Total</Th>
                </tr>
              </thead>
              <tbody>
                {pr.rows.map((r) => (
                  <TrH key={r.empId}>
                    <Td>
                      <div style={{ fontWeight: 600 }}>{r.empName}</div>
                    </Td>
                    <Td right>{inr(r.pf)}</Td>
                    <Td right>{r.esi > 0 ? inr(r.esi) : "--"}</Td>
                    <Td right>{inr(r.tds)}</Td>
                    <Td right>{inr(r.profTax)}</Td>
                    <Td
                      right
                      style={{ color: r.lopDeduction > 0 ? F.error : F.text3 }}
                    >
                      {r.lopDeduction > 0 ? inr(r.lopDeduction) : "Nil"}
                    </Td>
                    <Td right>
                      <strong>{inr(r.totalDeductions)}</strong>
                    </Td>
                  </TrH>
                ))}
              </tbody>
            </table>
          )}
          {pr && active === "earnings" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Employee</Th>
                  <Th right>Basic</Th>
                  <Th right>HRA</Th>
                  <Th right>Fixed Allow.</Th>
                  <Th right>Special Allow.</Th>
                  <Th right>Bonus</Th>
                  <Th right>Gross</Th>
                </tr>
              </thead>
              <tbody>
                {pr.rows.map((r) => {
                  const s = ss.find(
                    (x) =>
                      x.name ===
                      emps.find((e) => e.id === r.empId)?.salaryStructure,
                  )!
                  return (
                    <TrH key={r.empId}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{r.empName}</div>
                      </Td>
                      <Td right>{inr(s?.basic ?? 0)}</Td>
                      <Td right>{inr(s?.hra ?? 0)}</Td>
                      <Td right>{inr(s?.fixedAllowance ?? 0)}</Td>
                      <Td right>{inr(s?.specialAllowance ?? 0)}</Td>
                      <Td
                        right
                        style={{ color: r.bonus > 0 ? F.success : F.text3 }}
                      >
                        {r.bonus > 0 ? inr(r.bonus) : "--"}
                      </Td>
                      <Td right>
                        <strong>{inr(r.totalEarnings)}</strong>
                      </Td>
                    </TrH>
                  )
                })}
              </tbody>
            </table>
          )}
          {pr && active === "lop" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Employee</Th>
                  <Th>Department</Th>
                  <Th right>LOP Days</Th>
                  <Th right>Per-Day Salary</Th>
                  <Th right>LOP Deduction</Th>
                  <Th right>Net After LOP</Th>
                </tr>
              </thead>
              <tbody>
                {pr.rows.map((r) => {
                  const emp = emps.find((e) => e.id === r.empId)!
                  return (
                    <TrH key={r.empId}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{r.empName}</div>
                      </Td>
                      <Td>{emp?.department}</Td>
                      <Td
                        right
                        style={{ color: r.lopDays > 0 ? F.error : F.text3 }}
                      >
                        {r.lopDays > 0 ? r.lopDays : "--"}
                      </Td>
                      <Td right>
                        {inr(Math.round((emp?.grossSalary ?? 0) / 26))}
                      </Td>
                      <Td
                        right
                        style={{
                          color: r.lopDeduction > 0 ? F.error : F.text3,
                        }}
                      >
                        {r.lopDeduction > 0 ? inr(r.lopDeduction) : "Nil"}
                      </Td>
                      <Td right>
                        <strong>{inr(r.netSalary)}</strong>
                      </Td>
                    </TrH>
                  )
                })}
              </tbody>
            </table>
          )}
          {active === "payslip" && (
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 13, color: F.text2, marginBottom: 16 }}>
                Generate individual payslips for any employee and period.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <select style={{ ...iSt, width: 200 }}>
                  <option>All Employees</option>
                  {emps.map((e) => (
                    <option key={e.id}>{e.name}</option>
                  ))}
                </select>
                <Btn
                  onClick={() =>
                    toast("Payslips generated and ready to download", "success")
                  }
                >
                  Generate Payslips
                </Btn>
                <Btn
                  variant="secondary"
                  onClick={() =>
                    toast("Payslip report exported as PDF", "success")
                  }
                >
                  Export PDF
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface UserRow {
  name: string
  role: "Org Admin" | "Employee"
  status: "Active" | "Locked"
}
interface UserRow {
  name: string
  role: "Org Admin" | "Employee"
  status: "Active" | "Locked"
  department?: string
  scope?: string
}

function AccessManagementView({ emps }: { emps: Employee[] }) {
  const toast = useToast()

  // Initialize users roster with rich metadata
  const [users, setUsers] = useState<UserRow[]>([
    {
      name: "Meena Iyer",
      role: "Org Admin",
      status: "Active",
      department: "Executive & Admin",
      scope: "Full Admin Access",
    },
    ...emps
      .filter((e) => e.id !== "EMP-003")
      .map((e) => ({
        name: e.name,
        role: "Employee" as const,
        status: e.id === "EMP-006" ? ("Locked" as const) : ("Active" as const),
        department: e.department || "Operations",
        scope: "Self-Service Only",
      })),
  ])

  // Filter Bar state: Draft inputs + Applied filters
  const [showFilterBar, setShowFilterBar] = useState(true)

  const [searchDraft, setSearchDraft] = useState("")
  const [roleDraft, setRoleDraft] = useState("all")
  const [statusDraft, setStatusDraft] = useState("all")
  const [deptDraft, setDeptDraft] = useState("all")
  const [scopeDraft, setScopeDraft] = useState("all")

  const [appliedSearch, setAppliedSearch] = useState("")
  const [appliedRole, setAppliedRole] = useState("all")
  const [appliedStatus, setAppliedStatus] = useState("all")
  const [appliedDept, setAppliedDept] = useState("all")
  const [appliedScope, setAppliedScope] = useState("all")

  const [showAdd, setShowAdd] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    role: "Employee" as UserRow["role"],
    department: "Engineering",
  })
  const [editUser, setEditUser] = useState<UserRow | null>(null)
  const [confirm, setConfirm] = useState<{
    msg: string
    onOk: () => void
  } | null>(null)

  const f4UserNames = Array.from(new Set(users.map((u) => u.name)))
  const availableDepts = Array.from(new Set(users.map((u) => u.department || "Operations")))

  // Execute filter search on "Go"
  const handleGo = () => {
    setAppliedSearch(searchDraft)
    setAppliedRole(roleDraft)
    setAppliedStatus(statusDraft)
    setAppliedDept(deptDraft)
    setAppliedScope(scopeDraft)
    toast("Filter parameters applied", "info")
  }

  // Clear all filters
  const handleClear = () => {
    setSearchDraft("")
    setRoleDraft("all")
    setStatusDraft("all")
    setDeptDraft("all")
    setScopeDraft("all")

    setAppliedSearch("")
    setAppliedRole("all")
    setAppliedStatus("all")
    setAppliedDept("all")
    setAppliedScope("all")

    toast("All filters cleared", "info")
  }

  // Filter evaluation logic
  const filteredUsers = users.filter((u) => {
    if (appliedSearch && !u.name.toLowerCase().includes(appliedSearch.toLowerCase()) && !u.role.toLowerCase().includes(appliedSearch.toLowerCase())) {
      return false
    }
    if (appliedRole !== "all" && u.role !== appliedRole) {
      return false
    }
    if (appliedStatus !== "all" && u.status !== appliedStatus) {
      return false
    }
    if (appliedDept !== "all" && u.department !== appliedDept) {
      return false
    }
    if (appliedScope !== "all" && u.scope !== appliedScope) {
      return false
    }
    return true
  })

  const toggleLock = (u: UserRow) => {
    const next = u.status === "Active" ? "Locked" : "Active"
    setConfirm({
      msg: `${next === "Locked" ? "Lock" : "Unlock"} access for ${u.name}?`,
      onOk: () => {
        setUsers(
          users.map((x) => (x.name === u.name ? { ...x, status: next } : x)),
        )
        toast(
          `${u.name} ${next === "Locked" ? "locked" : "unlocked"}`,
          "success",
        )
        setConfirm(null)
      },
    })
  }

  const addUser = () => {
    if (!newUser.name) return toast("Name is required", "error")
    setUsers([
      ...users,
      {
        ...newUser,
        status: "Active",
        scope: newUser.role === "Org Admin" ? "Full Admin Access" : "Self-Service Only",
      },
    ])
    setShowAdd(false)
    setNewUser({ name: "", role: "Employee", department: "Engineering" })
    toast(`${newUser.name} added as ${newUser.role}`, "success")
  }

  const saveEditUser = () => {
    if (!editUser) return
    setUsers(users.map((u) => (u.name === editUser.name ? editUser : u)))
    setEditUser(null)
    toast("User role updated successfully", "success")
  }

  const orgAdminsCount = users.filter((u) => u.role === "Org Admin").length
  const employeesCount = users.filter((u) => u.role === "Employee").length
  const lockedCount = users.filter((u) => u.status === "Locked").length
  const activeFiltersCount =
    (appliedSearch ? 1 : 0) +
    (appliedRole !== "all" ? 1 : 0) +
    (appliedStatus !== "all" ? 1 : 0) +
    (appliedDept !== "all" ? 1 : 0) +
    (appliedScope !== "all" ? 1 : 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            Access Management & Roles
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Configure user accounts, role assignments, and security permissions
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn onClick={() => setShowAdd(true)}>+ Add User</Btn>
          <Btn variant="secondary" onClick={() => toast("User roster exported", "info")}>
            Export Roster
          </Btn>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <EmployeeMetricCard
          label="Total Users"
          value={`${users.length} Users`}
          sub="Registered organization platform logins"
          accent={F.brand}
          badgeText="Active Roster"
          badgeBg={F.infoBg}
          badgeColor={F.brand}
          progress={100}
        />
        <EmployeeMetricCard
          label="Organization Admins"
          value={`${orgAdminsCount} Admin`}
          sub="Full administrative & payroll execution rights"
          accent="#8B5CF6"
          badgeText="Admin"
          badgeBg="#F5F3FF"
          badgeColor="#7C3AED"
          progress={100}
        />
        <EmployeeMetricCard
          label="Employee Self-Service"
          value={`${employeesCount} Employees`}
          sub="Restricted to own salary, payslips & tax data"
          accent={F.success}
          badgeText="Standard Access"
          badgeBg={F.successBg}
          badgeColor={F.success}
          progress={100}
        />
        <EmployeeMetricCard
          label="Account Security"
          value={`${lockedCount} Locked`}
          sub={lockedCount > 0 ? "Accounts restricted from sign-in" : "All user accounts active"}
          accent={lockedCount > 0 ? F.warning : F.text3}
          badgeText={lockedCount > 0 ? "Security Alert" : "Protected"}
          badgeBg={lockedCount > 0 ? F.warningBg : F.pageBg}
          badgeColor={lockedCount > 0 ? F.warning : F.text2}
          progress={100}
        />
      </div>

      {/* SAP Fiori Filter Bar Panel */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          overflow: "hidden",
        }}
      >
        {/* Filter Bar Action Bar Header */}
        <div
          style={{
            padding: "12px 18px",
            borderBottom: showFilterBar ? `1px solid ${F.border}` : "none",
            background: F.card,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: F.text1 }}>
              Filter Bar
            </span>
            {activeFiltersCount > 0 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: F.brand,
                  background: F.infoBg,
                  padding: "2px 8px",
                  borderRadius: 12,
                }}
              >
                {activeFiltersCount} Active Filter{activeFiltersCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Action Row: Go, Clear Filters, Hide/Show Filter Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Btn onClick={handleGo} style={{ height: 34, padding: "0 18px", fontWeight: 700 }}>
              Go
            </Btn>
            <Btn variant="secondary" onClick={handleClear} style={{ height: 34 }}>
              Clear Filters
            </Btn>
            <Btn
              variant="secondary"
              onClick={() => setShowFilterBar(!showFilterBar)}
              style={{ height: 34 }}
            >
              {showFilterBar ? "Hide Filter Bar" : "Show Filter Bar"}
            </Btn>
          </div>
        </div>

        {/* Collapsible Filter Inputs Panel */}
        {showFilterBar && (
          <div
            style={{
              padding: "16px 18px",
              background: F.card,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              alignItems: "flex-end",
            }}
          >
            {/* 1. Search User (F4 Search) */}
            <div style={{ gridColumn: "span 2", minWidth: 260 }}>
              <ValueHelp
                label="Search User (F4 Search)"
                value={searchDraft}
                onChange={setSearchDraft}
                placeholder="Search user name or role (press Go to apply)…"
                values={f4UserNames}
              />
            </div>

            {/* 2. Role Filter */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: F.text2,
                  marginBottom: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Role Filter
              </div>
              <select
                value={roleDraft}
                onChange={(e) => setRoleDraft(e.target.value)}
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="all">All Roles</option>
                <option value="Org Admin">Org Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* 3. Account Status Filter */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: F.text2,
                  marginBottom: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Account Status
              </div>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Locked">Locked</option>
              </select>
            </div>

            {/* 4. Department Filter */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: F.text2,
                  marginBottom: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Department
              </div>
              <select
                value={deptDraft}
                onChange={(e) => setDeptDraft(e.target.value)}
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="all">All Departments</option>
                {availableDepts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Permission Scope Filter */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: F.text2,
                  marginBottom: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Access Scope
              </div>
              <select
                value={scopeDraft}
                onChange={(e) => setScopeDraft(e.target.value)}
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="all">All Scopes</option>
                <option value="Full Admin Access">Full Admin Access</option>
                <option value="Self-Service Only">Self-Service Only</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* User Roster Table */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${F.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
              Platform User Roster
            </h2>
            <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
              Showing {filteredUsers.length} of {users.length} registered user accounts
            </div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, fontSize: 13 }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${F.border}`,
                  background: F.pageBg,
                  color: F.text2,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                <th style={{ padding: "12px 18px", textAlign: "left" }}>Platform User</th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>Assigned Role</th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>Department</th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>Permission Scope</th>
                <th style={{ padding: "12px 14px", textAlign: "center" }}>Account Status</th>
                <th style={{ padding: "12px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 44, textAlign: "center", color: F.text3 }}>
                    No platform users match your filter criteria. Click "Clear Filters" or adjust search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.name}
                    style={{
                      borderBottom: `1px solid ${F.border}60`,
                      transition: "background 0.12s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = F.pageBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <strong style={{ color: F.text1 }}>{u.name}</strong>
                    </td>
                    <td style={{ padding: "14px 14px" }}>
                      <Badge
                        label={u.role}
                        color={u.role === "Org Admin" ? F.brand : F.text2}
                        bg={u.role === "Org Admin" ? F.infoBg : F.pageBg}
                      />
                    </td>
                    <td style={{ padding: "14px 14px", color: F.text2 }}>
                      {u.department || "Operations"}
                    </td>
                    <td style={{ padding: "14px 14px", color: F.text3, fontSize: 12 }}>
                      {u.scope || "Self-Service Only"}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      <Badge
                        label={u.status}
                        color={u.status === "Active" ? F.success : F.error}
                        bg={u.status === "Active" ? F.successBg : F.errorBg}
                        dot={u.status === "Active" ? F.success : F.error}
                      />
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <Btn small variant="secondary" onClick={() => setEditUser({ ...u })}>
                          Edit Role
                        </Btn>
                        <Btn
                          small
                          variant="secondary"
                          onClick={() => toggleLock(u)}
                          style={{
                            color: u.status === "Active" ? F.error : F.success,
                          }}
                        >
                          {u.status === "Active" ? "Lock" : "Unlock"}
                        </Btn>
                        <Btn
                          small
                          variant="secondary"
                          onClick={() => toast(`Password reset email sent to ${u.name}`, "info")}
                        >
                          Reset Pwd
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <Modal title="Add New Platform User" onClose={() => setShowAdd(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Fld label="User Full Name">
              <input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter name (e.g. Ananya Roy)"
                style={iSt}
              />
            </Fld>
            <Fld label="Department">
              <select
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="Engineering">Engineering</option>
                <option value="HR & Payroll">HR & Payroll</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Executive & Admin">Executive & Admin</option>
              </select>
            </Fld>
            <Fld label="Assign Role">
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as UserRow["role"] })
                }
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="Employee">Employee (Self-Service)</option>
                <option value="Org Admin">Organization Admin</option>
              </select>
            </Fld>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <Btn variant="secondary" onClick={() => setShowAdd(false)}>
                Cancel
              </Btn>
              <Btn onClick={addUser}>Add User</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Role Modal */}
      {editUser && (
        <Modal title={`Edit Role — ${editUser.name}`} onClose={() => setEditUser(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Fld label="User Role">
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    role: e.target.value as UserRow["role"],
                    scope: e.target.value === "Org Admin" ? "Full Admin Access" : "Self-Service Only",
                  })
                }
                style={{ ...iSt, cursor: "pointer" }}
              >
                <option value="Employee">Employee (Self-Service)</option>
                <option value="Org Admin">Organization Admin</option>
              </select>
            </Fld>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <Btn variant="secondary" onClick={() => setEditUser(null)}>
                Cancel
              </Btn>
              <Btn onClick={saveEditUser}>Save Role Changes</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirm Action Dialog */}
      {confirm && (
        <Modal title="Confirm Security Action" onClose={() => setConfirm(null)}>
          <p style={{ color: F.text2, fontSize: 13 }}>{confirm.msg}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
            <Btn variant="secondary" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn onClick={confirm.onOk}>Confirm Action</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

function AuditHistoryView({ logs }: { logs: AuditLog[] }) {
  const toast = useToast()
  const [modFilter, setModFilter] = useState("All")
  const [userFilter, setUserFilter] = useState("All")
  const [search, setSearch] = useState("")
  const modules = ["All", ...Array.from(new Set(logs.map((a) => a.module)))]
  const users = ["All", ...Array.from(new Set(logs.map((a) => a.user)))]
  const filtered = logs.filter(
    (a) =>
      (modFilter === "All" || a.module === modFilter) &&
      (userFilter === "All" || a.user === userFilter) &&
      (!search ||
        a.action.toLowerCase().includes(search.toLowerCase()) ||
        a.user.toLowerCase().includes(search.toLowerCase())),
  )
  return (
    <div>
      <PH
        title="Audit History"
        sub="Immutable record of all sensitive payroll and access actions"
        action={
          <Btn
            variant="secondary"
            onClick={() => toast("Audit log exported as CSV", "success")}
          >
            Export Log
          </Btn>
        }
      />
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search action or user..."
          style={{ ...iSt, flex: "1 1 220px" }}
        />
        <select
          value={modFilter}
          onChange={(e) => setModFilter(e.target.value)}
          style={{ ...iSt, width: 150 }}
        >
          {modules.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          style={{ ...iSt, width: 160 }}
        >
          {users.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th>Timestamp</Th>
              <Th>User</Th>
              <Th>Module</Th>
              <Th>Action</Th>
              <Th>Old Value</Th>
              <Th>New Value</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 32,
                    textAlign: "center",
                    color: F.text3,
                    fontSize: 13,
                  }}
                >
                  No matching audit events.
                </td>
              </tr>
            )}
            {filtered.map((a) => (
              <TrH key={a.id}>
                <Td mono>
                  <span style={{ fontSize: 11, color: F.text2 }}>
                    {a.timestamp}
                  </span>
                </Td>
                <Td>
                  <span style={{ fontWeight: 600 }}>{a.user}</span>
                </Td>
                <Td>
                  <Badge label={a.module} color={F.brand} bg={F.infoBg} />
                </Td>
                <Td>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>
                    {a.action}
                  </span>
                </Td>
                <Td>
                  <span
                    style={{
                      fontSize: 11,
                      color: F.text3,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {a.oldValue}
                  </span>
                </Td>
                <Td>
                  <span
                    style={{
                      fontSize: 11,
                      color: F.success,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {a.newValue}
                  </span>
                </Td>
              </TrH>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlatformDashboard({
  orgs,
  logs,
  onNav,
}: {
  orgs: Organization[]
  logs: AuditLog[]
  onNav: (v: string) => void
}) {
  const toast = useToast()
  const { text: greeting, icon: greetingIcon } = getTimeGreeting()
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const totalEmployees = orgs.reduce((sum, o) => sum + o.employees, 0)
  const active = orgs.filter((o) => o.status === "Active").length
  const statusSegments = [
    { label: "Active", value: active, color: F.success },
    {
      label: "Draft",
      value: orgs.filter((o) => o.status === "Draft").length,
      color: F.brand,
    },
    {
      label: "Inactive",
      value: orgs.filter((o) => o.status === "Inactive").length,
      color: F.warning,
    },
    {
      label: "Suspended",
      value: orgs.filter((o) => o.status === "Suspended").length,
      color: F.error,
    },
  ].filter((x) => x.value > 0)
  const trend = [72, 78, 82, 86, 91, 96, Math.max(totalEmployees, 100)]
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{greetingIcon}</span>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: F.text1,
                letterSpacing: "-0.3px",
              }}
            >
              {greeting}, Platform Admin
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: F.text2 }}>
            Naxpayroll Platform Health &bull; System Analytics
          </p>
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: F.brand,
            background: F.infoBg,
            padding: "5px 12px",
            borderRadius: 16,
            border: `1px solid ${F.brand}20`,
          }}
        >
          {todayStr}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{ margin: 0, fontSize: 18, fontWeight: 800, color: F.text1 }}
          >
            Platform Overview
          </h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: F.text2 }}>
            Organization metrics and subscription status
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn
            variant="secondary"
            onClick={() => toast("Platform summary exported", "success")}
          >
            Export summary
          </Btn>
          <Btn onClick={() => onNav("orgs")}>Manage organizations</Btn>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
        }}
      >
        {[
          {
            l: "Active organizations",
            v: String(active),
            s: `${orgs.length} total workspaces`,
            c: F.success,
          },
          {
            l: "Managed employees",
            v: String(totalEmployees),
            s: "Across active organizations",
            c: F.brand,
          },
          {
            l: "Product Admins",
            v: "4",
            s: "Platform-level administrators",
            c: F.warning,
          },
          { l: "System uptime", v: "99.9%", s: "Last 30 days", c: "#8A5CF6" },
        ].map((x) => (
          <div
            key={x.l}
            style={{
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 8,
              padding: "17px 18px",
              borderTop: `3px solid ${x.c}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: ".06em",
                fontWeight: 700,
                color: F.text3,
              }}
            >
              {x.l}
            </div>
            <div
              style={{
                fontSize: 25,
                fontWeight: 800,
                color: F.text1,
                marginTop: 10,
              }}
            >
              {x.v}
            </div>
            <div style={{ fontSize: 12, color: F.text2, marginTop: 5 }}>
              {x.s}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr .85fr",
          gap: 14,
        }}
      >
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                Workforce growth
              </div>
              <div style={{ fontSize: 12, color: F.text3, marginTop: 3 }}>
                Total managed employees · last 7 months
              </div>
            </div>
            <Badge label="+8.7%" color={F.success} bg={F.successBg} />
          </div>
          <div
            style={{
              height: 150,
              display: "flex",
              alignItems: "end",
              gap: 14,
              padding: "0 6px",
              borderBottom: `1px solid ${F.border}`,
            }}
          >
            {trend.map((v, i) => (
              <div
                key={i}
                style={{
                  height: "100%",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <div style={{ fontSize: 10, color: F.text3 }}>{v}</div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: 42,
                    height: `${(v / trend[trend.length - 1]) * 100}%`,
                    minHeight: 12,
                    borderRadius: "4px 4px 0 0",
                    background: i === trend.length - 1 ? F.brand : "#B8D9F5",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: F.text3,
              marginTop: 8,
            }}
          >
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "18px 20px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15 }}>
            Organization status
          </div>
          <div style={{ fontSize: 12, color: F.text3, marginTop: 3 }}>
            Workspace readiness at a glance
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 18,
            }}
          >
            <RingChart
              size={126}
              segments={statusSegments}
              centerLabel={`${active}/${orgs.length}`}
              centerSub="active"
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {statusSegments.map((x) => (
                <div
                  key={x.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 12,
                    color: F.text2,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: x.color,
                    }}
                  />
                  <span>{x.label}</span>
                  <strong style={{ color: F.text1, marginLeft: "auto" }}>
                    {x.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                Platform alerts
              </div>
              <div style={{ fontSize: 12, color: F.text3, marginTop: 3 }}>
                Items requiring platform attention
              </div>
            </div>
            <Btn small variant="ghost" onClick={() => onNav("audit")}>
              View audit
            </Btn>
          </div>
          {[
            [
              "1 organization needs administrator assignment",
              F.warning,
              "Setup",
            ],
            ["New feature 'Bulk Export' deployed", F.brand, "System"],
            ["2 platform users locked out", F.error, "Security"],
          ].map(([title, color, tag]) => (
            <div
              key={String(title)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderTop: `1px solid ${F.border}`,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: String(color),
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>
                {title}
              </span>
              <span style={{ fontSize: 11, color: F.text3 }}>{tag}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "18px 20px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15 }}>
            Recent platform activity
          </div>
          <div
            style={{
              fontSize: 12,
              color: F.text3,
              marginTop: 3,
              marginBottom: 10,
            }}
          >
            Latest audited actions across the platform
          </div>
          {logs
            .filter(
              (a) =>
                ["Access", "Organizations", "Platform"].includes(a.module) ||
                a.action.includes("Org") ||
                a.action.includes("Access"),
            )
            .slice(0, 3)
            .map((a) => (
              <div
                key={a.id}
                style={{
                  padding: "10px 0",
                  borderTop: `1px solid ${F.border}`,
                  display: "flex",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    background: F.infoBg,
                    color: F.brand,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  {a.module.slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>
                    {a.action}
                  </div>
                  <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                    {a.user} · {a.timestamp.slice(0, 10)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

function OrganizationsView({
  orgs,
  setOrgs,
}: {
  orgs: Organization[]
  setOrgs: React.Dispatch<React.SetStateAction<Organization[]>>
}) {
  const toast = useToast()
  const [showAdd, setShowAdd] = useState(false)
  const [editOrg, setEditOrg] = useState<Organization | null>(null)
  const [confirm, setConfirm] = useState<{
    msg: string
    onOk: () => void
  } | null>(null)
  const [form, setForm] = useState({
    name: "",
    code: "",
    legalName: "",
    country: "India",
    currency: "INR",
    financialYear: "April-March",
  })
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [country, setCountry] = useState("")
  const [currency, setCurrency] = useState("")
  const [fy, setFy] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(true)

  const [page, setPage] = useState(1)
  const rowsPerPage = 15

  useEffect(() => {
    setPage(1)
  }, [search, status, country, currency, fy])

  const addOrg = () => {
    if (!form.name || !form.code)
      return toast("Name and code are required", "error")
    const o: Organization = {
      id: `ORG-${String(orgs.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Draft",
      employees: 0,
      admin: "-",
    }
    setOrgs([...orgs, o])
    setShowAdd(false)
    setForm({
      name: "",
      code: "",
      legalName: "",
      country: "India",
      currency: "INR",
      financialYear: "April-March",
    })
    toast(`Organization "${o.name}" created`, "success")
  }

  const toggleStatus = (org: Organization) => {
    const next: OrgStatus = org.status === "Active" ? "Inactive" : "Active"
    setConfirm({
      msg: `Set "${org.name}" to ${next}?`,
      onOk: () => {
        setOrgs(orgs.map((o) => (o.id === org.id ? { ...o, status: next } : o)))
        toast(`Organization status updated to ${next}`, "success")
        setConfirm(null)
      },
    })
  }

  const saveEdit = () => {
    if (!editOrg) return
    setOrgs(orgs.map((o) => (o.id === editOrg.id ? editOrg : o)))
    setEditOrg(null)
    toast("Organization updated", "success")
  }

  const filtered = orgs.filter((o) => {
    const q = search.toLowerCase()
    return (
      (!q ||
        [o.name, o.code, o.id, o.legalName, o.admin].some((x) =>
          x.toLowerCase().includes(q),
        )) &&
      (!status || o.status === status) &&
      (!country || o.country === country) &&
      (!currency || o.currency === currency) &&
      (!fy || o.financialYear === fy)
    )
  })

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const toggleOne = (id: string) =>
    setSelected((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    )
  const resetFilters = () => {
    setSearch("")
    setStatus("")
    setCountry("")
    setCurrency("")
    setFy("")
  }
  const allVisible =
    paginated.length > 0 && paginated.every((o) => selected.includes(o.id))

  const searchSuggestions = [
    ...new Set(
      orgs
        .flatMap((o) => [o.name, o.code, o.id, o.admin])
        .filter((x) => x !== "-"),
    ),
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PH
        title="Organizations"
        sub="All organizations managed by this platform"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn
              variant="secondary"
              onClick={() =>
                toast("Organization list exported as CSV", "success")
              }
            >
              Export
            </Btn>
            <Btn onClick={() => setShowAdd(true)}>+ Create Organization</Btn>
          </div>
        }
      />
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
            borderBottom: filtersOpen ? `1px solid ${F.border}` : undefined,
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <ValueHelp
              label="Search Organization"
              value={search}
              onChange={setSearch}
              placeholder="Search by name, code, admin..."
              values={searchSuggestions}
            />
          </div>
          <Btn variant="secondary" onClick={() => setFiltersOpen((x) => !x)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 6 }}
            >
              <path d="M4 5h16M7 12h10M10 19h4" />
            </svg>{" "}
            Filters{" "}
            {[status, country, currency, fy].filter(Boolean).length > 0 &&
              `(${[status, country, currency, fy].filter(Boolean).length})`}
          </Btn>
        </div>
        {filtersOpen && (
          <div
            style={{
              padding: "14px 18px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              alignItems: "end",
              background: "#FAFBFC",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <ValueHelp
              label="Status"
              value={status}
              onChange={setStatus}
              placeholder="All statuses"
              values={["Active", "Draft", "Inactive", "Suspended"]}
            />
            <ValueHelp
              label="Country"
              value={country}
              onChange={setCountry}
              placeholder="All countries"
              values={[...new Set(orgs.map((o) => o.country))]}
            />
            <ValueHelp
              label="Currency"
              value={currency}
              onChange={setCurrency}
              placeholder="All currencies"
              values={[...new Set(orgs.map((o) => o.currency))]}
            />
            <ValueHelp
              label="Financial year"
              value={fy}
              onChange={setFy}
              placeholder="All financial years"
              values={[...new Set(orgs.map((o) => o.financialYear))]}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 2,
              }}
            >
              <Btn small variant="ghost" onClick={resetFilters}>
                Clear filters
              </Btn>
            </div>
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div
          style={{
            padding: "10px 16px",
            background: F.infoBg,
            border: `1px solid #B8D9F5`,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: F.brand }}>
            {selected.length} organizations selected
          </span>
          <Btn
            small
            variant="ghost"
            onClick={() =>
              toast(
                `${selected.length} organization records exported`,
                "success",
              )
            }
          >
            Export selected
          </Btn>
          <Btn small variant="ghost" onClick={() => setSelected([])}>
            Clear selection
          </Btn>
        </div>
      )}

      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <div style={{ overflow: "auto", flex: 1 }}>
          <table
            style={{
              width: "100%",
              minWidth: 1000,
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: F.pageBg,
                boxShadow: `0 1px 0 ${F.border}`,
              }}
            >
              <tr>
                <Th>
                  <input
                    aria-label="Select all"
                    type="checkbox"
                    checked={allVisible}
                    onChange={() =>
                      setSelected(
                        allVisible
                          ? selected.filter(
                              (x) => !paginated.some((o) => o.id === x),
                            )
                          : [
                              ...new Set([
                                ...selected,
                                ...paginated.map((o) => o.id),
                              ]),
                            ],
                      )
                    }
                  />
                </Th>
                <Th>Organization</Th>
                <Th>Code</Th>
                <Th>Country</Th>
                <Th>Financial Year</Th>
                <Th>Administrator</Th>
                <Th right>Employees</Th>
                <Th>Status</Th>
                <Th right>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: 60,
                      textAlign: "center",
                      color: F.text3,
                      fontSize: 14,
                    }}
                  >
                    No organizations match your filters.{" "}
                    <button
                      onClick={resetFilters}
                      style={{
                        color: F.brand,
                        border: 0,
                        background: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        marginLeft: 4,
                      }}
                    >
                      Reset all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginated.map((org) => (
                  <TrH key={org.id} onClick={() => setEditOrg({ ...org })}>
                    <Td style={{ width: 40 }}>
                      <input
                        aria-label={`Select ${org.name}`}
                        type="checkbox"
                        checked={selected.includes(org.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleOne(org.id)}
                      />
                    </Td>
                    <Td>
                      <div
                        style={{
                          fontWeight: 700,
                          color: F.text1,
                          marginBottom: 3,
                        }}
                      >
                        {org.name}
                      </div>
                      <div style={{ fontSize: 11, color: F.text3 }}>
                        {org.legalName} · {org.id}
                      </div>
                    </Td>
                    <Td mono style={{ color: F.text2, fontWeight: 600 }}>
                      {org.code}
                    </Td>
                    <Td>
                      <div style={{ color: F.text1, marginBottom: 3 }}>
                        {org.country}
                      </div>
                      <div style={{ fontSize: 11, color: F.text3 }}>
                        {org.currency}
                      </div>
                    </Td>
                    <Td style={{ color: F.text2 }}>{org.financialYear}</Td>
                    <Td>
                      {org.admin === "-" ? (
                        <span style={{ color: F.text3, fontStyle: "italic" }}>
                          Unassigned
                        </span>
                      ) : (
                        <span style={{ color: F.text1, fontWeight: 500 }}>
                          {org.admin}
                        </span>
                      )}
                    </Td>
                    <Td right>
                      <span style={{ fontWeight: 800, color: F.text1 }}>
                        {org.employees}
                      </span>
                    </Td>
                    <Td>{orgBadge(org.status)}</Td>
                    <Td right>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "flex-end",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Btn
                          small
                          variant="secondary"
                          onClick={() => setEditOrg({ ...org })}
                        >
                          Edit
                        </Btn>
                        <Btn
                          small
                          variant="ghost"
                          onClick={() => toggleStatus(org)}
                        >
                          {org.status === "Active" ? "Deactivate" : "Activate"}
                        </Btn>
                      </div>
                    </Td>
                  </TrH>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: "12px 18px",
            borderTop: `1px solid ${F.border}`,
            background: F.pageBg,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: F.text3 }}>
            Showing {(page - 1) * rowsPerPage + 1} -{" "}
            {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}{" "}
            organizations
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn
              small
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Btn>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                fontSize: 12,
                fontWeight: 600,
                color: F.text2,
              }}
            >
              Page {page} of {totalPages}
            </div>
            <Btn
              small
              variant="secondary"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Btn>
          </div>
        </div>
      </div>
      {showAdd && (
        <Modal title="Create Organization" onClose={() => setShowAdd(false)}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Organization Name *">
              <input
                style={iSt}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Acme Corp Pvt. Ltd."
              />
            </Fld>
            <Fld label="Org Code *">
              <input
                style={iSt}
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value.toUpperCase() })
                }
                placeholder="e.g. ACM"
              />
            </Fld>
            <Fld label="Legal Name">
              <input
                style={iSt}
                value={form.legalName}
                onChange={(e) =>
                  setForm({ ...form, legalName: e.target.value })
                }
              />
            </Fld>
            <Fld label="Country">
              <select
                style={iSt}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Singapore</option>
              </select>
            </Fld>
            <Fld label="Currency">
              <select
                style={iSt}
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              >
                <option>INR</option>
                <option>USD</option>
                <option>GBP</option>
                <option>SGD</option>
              </select>
            </Fld>
            <Fld label="Financial Year">
              <select
                style={iSt}
                value={form.financialYear}
                onChange={(e) =>
                  setForm({ ...form, financialYear: e.target.value })
                }
              >
                <option>April-March</option>
                <option>January-December</option>
                <option>July-June</option>
              </select>
            </Fld>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <Btn variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Btn>
            <Btn onClick={addOrg}>Create Organization</Btn>
          </div>
        </Modal>
      )}
      {editOrg && (
        <Modal
          title={`Edit - ${editOrg.name}`}
          onClose={() => setEditOrg(null)}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Fld label="Organization Name">
              <input
                style={iSt}
                value={editOrg.name}
                onChange={(e) =>
                  setEditOrg({ ...editOrg, name: e.target.value })
                }
              />
            </Fld>
            <Fld label="Org Code">
              <input
                style={iSt}
                value={editOrg.code}
                onChange={(e) =>
                  setEditOrg({ ...editOrg, code: e.target.value.toUpperCase() })
                }
              />
            </Fld>
            <Fld label="Legal Name">
              <input
                style={iSt}
                value={editOrg.legalName}
                onChange={(e) =>
                  setEditOrg({ ...editOrg, legalName: e.target.value })
                }
              />
            </Fld>
            <Fld label="Org Admin">
              <input
                style={iSt}
                value={editOrg.admin}
                onChange={(e) =>
                  setEditOrg({ ...editOrg, admin: e.target.value })
                }
              />
            </Fld>
            <Fld label="Status">
              <select
                style={iSt}
                value={editOrg.status}
                onChange={(e) =>
                  setEditOrg({
                    ...editOrg,
                    status: e.target.value as OrgStatus,
                  })
                }
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </Fld>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <Btn variant="secondary" onClick={() => setEditOrg(null)}>
              Cancel
            </Btn>
            <Btn onClick={saveEdit}>Save Changes</Btn>
          </div>
        </Modal>
      )}
      {confirm && (
        <Confirm
          msg={confirm.msg}
          onOk={confirm.onOk}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}

function MyProfileView({ emp }: { emp: Employee }) {
  const toast = useToast()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(emp)
  const phoneValid = /^\+?[1-9]\d{7,14}$/.test(
    (draft.mobile ?? "").replace(/[\s-]/g, ""),
  )
  return (
    <div style={{ maxWidth: 680 }}>
      <PH
        title="My Profile"
        sub="Your personal and employment information"
        action={
          editing ? (
            <div style={{ display: "flex", gap: 8 }}>
              <Btn
                variant="secondary"
                onClick={() => {
                  setDraft(emp)
                  setEditing(false)
                }}
              >
                Cancel
              </Btn>
              <Btn
                onClick={() => {
                  if (!phoneValid) {
                    toast(
                      "Enter a valid mobile number with country code",
                      "error",
                    )
                    return
                  }
                  setEditing(false)
                  toast("Profile updated", "success")
                }}
              >
                Save Changes
              </Btn>
            </div>
          ) : (
            <Btn variant="secondary" onClick={() => setEditing(true)}>
              Edit Profile
            </Btn>
          )
        }
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 4,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: F.brand,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          {emp.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: F.text1 }}>
            {emp.name}
          </div>
          <div style={{ fontSize: 13, color: F.text2, marginTop: 2 }}>
            {emp.designation} - {emp.department}
          </div>
          <div style={{ marginTop: 6 }}>{empBadge(emp.status)}</div>
        </div>
      </div>
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 4,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            padding: "11px 18px",
            borderBottom: `1px solid ${F.border}`,
            background: F.pageBg,
            fontSize: 13,
            fontWeight: 600,
            color: F.text1,
          }}
        >
          Personal Details
        </div>
        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <Fld label="Employee ID">
            <input style={iSt} value={emp.id} readOnly />
          </Fld>
          <Fld label="Email">
            <input
              style={iSt}
              value={editing ? draft.email : emp.email}
              readOnly={!editing}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </Fld>
          <Fld label="Mobile Number *">
            <input
              aria-required="true"
              inputMode="tel"
              style={{
                ...iSt,
                borderColor: editing && !phoneValid ? F.error : F.border,
              }}
              value={
                editing ? (draft.mobile ?? "") : (emp.mobile ?? "Not provided")
              }
              readOnly={!editing}
              onChange={(e) => setDraft({ ...draft, mobile: e.target.value })}
              placeholder="+91 98765 43210"
            />
            {editing && !phoneValid && (
              <span style={{ fontSize: 11, color: F.error }}>
                Enter a valid number, including country code.
              </span>
            )}
          </Fld>
          <Fld label="Department">
            <input style={iSt} value={emp.department} readOnly />
          </Fld>
          <Fld label="Designation">
            <input style={iSt} value={emp.designation} readOnly />
          </Fld>
          <Fld label="Date of Joining">
            <input style={iSt} value={fmtD(emp.doj)} readOnly />
          </Fld>
          <Fld label="Employment Type">
            <input style={iSt} value={emp.empType} readOnly />
          </Fld>
          <Fld label="Reporting Manager">
            <input style={iSt} value={emp.manager} readOnly />
          </Fld>
          <Fld label="Work Location">
            <input
              style={iSt}
              value={editing ? draft.location : emp.location}
              readOnly={!editing}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            />
          </Fld>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Btn
          variant="secondary"
          onClick={() =>
            toast(
              "Password reset email sent to your registered email",
              "success",
            )
          }
        >
          Reset Password
        </Btn>
      </div>
    </div>
  )
}

interface NotifItem {
  id: number
  msg: string
  time: string
  read: boolean
  module: string
}
const INIT_NOTIFS: NotifItem[] = [
  {
    id: 1,
    msg: "August 2026 payroll is Under Review — approval required",
    time: "2 hours ago",
    read: false,
    module: "Payroll",
  },
  {
    id: 2,
    msg: "Vikram Reddy's leave status updated to On Leave",
    time: "5 hours ago",
    read: false,
    module: "Employees",
  },
  {
    id: 3,
    msg: "Salary structure 'Senior Engineer' was updated (Gross: ₹1,10,000)",
    time: "1 day ago",
    read: false,
    module: "Salary",
  },
  {
    id: 4,
    msg: "Pay run PR-2026-08 generated by Meena Iyer",
    time: "2 days ago",
    read: false,
    module: "Payroll",
  },
  {
    id: 5,
    msg: "Rahul Mehta onboarded — salary assignment pending",
    time: "3 days ago",
    read: true,
    module: "Employees",
  },
  {
    id: 6,
    msg: "July 2026 payroll completed — payslips generated",
    time: "5 days ago",
    read: true,
    module: "Payroll",
  },
  {
    id: 7,
    msg: "Access role changed for Rajesh Kumar (Associate → Manager)",
    time: "6 days ago",
    read: true,
    module: "Access",
  },
]

function NotificationBell({
  showToast,
}: {
  showToast: (msg: string, type?: ToastType) => void
}) {
  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState<NotifItem[]>(INIT_NOTIFS)
  const unread = notifs.filter((n) => !n.read).length

  const moduleColor: Record<string, string> = {
    Payroll: F.brand,
    Employees: F.success,
    Salary: F.warning,
    Access: "#8A5CF6",
  }
  const moduleIcon: Record<string, React.ReactNode> = {
    Payroll: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    Employees: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    Salary: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    Access: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  }

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
    showToast("All notifications marked as read", "success")
  }
  const clearAll = () => {
    setNotifs([])
    showToast("Notifications cleared", "info")
  }
  const dismiss = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifs(notifs.filter((n) => n.id !== id))
  }
  const markRead = (id: number) =>
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Notifications"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: 8,
          background: open
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,255,255,0.12)",
          border: `1px solid ${
            open ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.18)"
          }`,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.22)"
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.32)"
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)"
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.18)"
          }
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              background: F.error,
              border: `2px solid ${F.shell}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 800,
              color: "#fff",
              padding: "0 3px",
              lineHeight: 1,
            }}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 148 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 10px)",
              width: 380,
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 10,
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              zIndex: 149,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px 12px",
                borderBottom: `1px solid ${F.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: F.text1 }}>
                  Notifications ({notifs.length})
                </span>
                {unread > 0 && (
                  <span
                    style={{ fontSize: 12, color: F.brand, fontWeight: 600 }}
                  >
                    {unread} unread
                  </span>
                )}
              </div>
              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={markAllRead}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    background: F.infoBg,
                    border: `1px solid ${F.brand}30`,
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color: F.brand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontFamily: "inherit",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Mark all read
                </button>
                <button
                  onClick={clearAll}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    background: F.errorBg,
                    border: `1px solid ${F.error}30`,
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color: F.error,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontFamily: "inherit",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                  Clear notifications
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {notifs.length === 0 && (
                <div
                  style={{
                    padding: "36px 18px",
                    textAlign: "center",
                    color: F.text3,
                    fontSize: 13,
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={F.border}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      marginBottom: 10,
                      display: "block",
                      margin: "0 auto 10px",
                    }}
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  No notifications
                </div>
              )}
              {notifs.map((n, i) => {
                const col = moduleColor[n.module] ?? F.brand
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "14px 18px",
                      borderBottom:
                        i < notifs.length - 1
                          ? `1px solid ${F.border}`
                          : "none",
                      background: n.read ? "transparent" : F.infoBg,
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = n.read
                        ? F.pageBg
                        : `${F.brand}10`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = n.read
                        ? "transparent"
                        : F.infoBg)
                    }
                  >
                    {/* Module icon circle */}
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: `${col}18`,
                        border: `1.5px solid ${col}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: col,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {moduleIcon[n.module] ?? moduleIcon["Payroll"]}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          color: F.text1,
                          lineHeight: 1.5,
                          fontWeight: n.read ? 400 : 500,
                        }}
                      >
                        {n.msg}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 5,
                        }}
                      >
                        <span style={{ fontSize: 11, color: F.text3 }}>
                          {n.time}
                        </span>
                        {!n.read && (
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: F.brand,
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: col,
                            background: `${col}15`,
                            padding: "1px 6px",
                            borderRadius: 4,
                          }}
                        >
                          {n.module}
                        </span>
                      </div>
                    </div>
                    {/* Dismiss */}
                    <button
                      onClick={(e) => dismiss(n.id, e)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: F.text3,
                        padding: "2px 4px",
                        borderRadius: 4,
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        marginTop: 2,
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = F.errorBg
                        e.currentTarget.style.color = F.error
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none"
                        e.currentTarget.style.color = F.text3
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            {notifs.length > 0 && (
              <div
                style={{
                  padding: "10px 18px",
                  borderTop: `1px solid ${F.border}`,
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    setOpen(false)
                    showToast("Viewing all notifications", "info")
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: F.brand,
                    fontWeight: 600,
                    fontFamily: "inherit",
                  }}
                >
                  View all notifications →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ProfileMenu({
  persona,
  onProfile,
  personaUser,
  personaRole,
  personaInit,
  showToast,
  onSignOut,
}: {
  persona: Persona
  onProfile: () => void
  personaUser: Record<Persona, string>
  personaRole: Record<Persona, string>
  personaInit: Record<Persona, string>
  showToast: (msg: string, type?: ToastType) => void
  onSignOut?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        position: "relative",
        paddingLeft: 10,
        borderLeft: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 6px",
          borderRadius: 4,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: F.brand,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {personaInit[persona]}
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {personaUser[persona]}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
            {personaRole[persona]}
          </div>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: 2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 149 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              width: 240,
              background: F.card,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
              zIndex: 150,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                background: F.shell,
                borderBottom: `1px solid rgba(255,255,255,0.1)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: F.brand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {personaInit[persona]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    {personaUser[persona]}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}
                  >
                    {personaRole[persona]}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "6px 0" }}>
              {persona === "employee" ? (
                ["View Profile", "Edit Profile", "Reset Password"].map(
                  (label) => (
                    <button
                      key={label}
                      onClick={() => {
                        setOpen(false)
                        label === "Reset Password"
                          ? showToast(
                              "Password reset email sent to your registered email",
                              "success",
                            )
                          : onProfile()
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "9px 16px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                        color: F.text1,
                        fontSize: 13,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = F.highlight)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {label}
                    </button>
                  ),
                )
              ) : (
                <button
                  onClick={() => {
                    setOpen(false)
                    onProfile()
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    color: F.text1,
                    fontSize: 13,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = F.highlight)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={F.text2}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>My Profile</span>
                </button>
              )}
            </div>
            <div
              style={{ borderTop: `1px solid ${F.border}`, padding: "6px 0" }}
            >
              <button
                onClick={() => {
                  showToast("Logged out successfully", "info")
                  setOpen(false)
                  onSignOut?.()
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "9px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  color: F.error,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = F.errorBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function NavIcon({ id }: { id: string }) {
  const s = { width: 16, height: 16, flexShrink: 0 } as React.CSSProperties
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  if (id === "dashboard")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  if (id === "employees")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  if (id === "salary")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  if (id === "payruns")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  if (id === "payslips")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  if (id === "reports")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  if (id === "analytics")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="5" />
        <rect x="12" y="8" width="3" height="9" />
        <rect x="17" y="5" width="3" height="12" />
      </svg>
    )
  if (id === "access")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  if (id === "audit")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  if (id === "orgs")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  if (id === "profile")
    return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  return (
    <svg style={s} viewBox="0 0 24 24" {...p}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

const ORG_NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "employees", label: "Employees" },
  { id: "salary", label: "Salary Management" },
  { id: "payruns", label: "Payroll / Pay Runs" },
  { id: "payslips", label: "Payslips" },
  { id: "reports", label: "Reports" },
  { id: "access", label: "Access Management" },
  { id: "audit", label: "Audit History" },
]
const PROD_NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "orgs", label: "Organizations" },
  { id: "access", label: "Access Management" },
  { id: "audit", label: "Audit History" },
]
const EMP_NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "salary", label: "My Salary" },
  { id: "payruns", label: "Payroll History" },
  { id: "payslips", label: "My Payslips" },
  { id: "documents", label: "Documents" },
  { id: "financial", label: "Financial Data" },
]
const MY_EMP_ID = "EMP-001"

// Employee data access boundary. Every employee view derives its data from this
// identity; a route/query parameter can never select a different employee.
function ownPayruns(payruns: Payrun[], employeeId: string) {
  return payruns.filter((run) =>
    run.rows.some((row) => row.empId === employeeId),
  )
}

function employeeRows(emp: Employee, payruns: Payrun[]) {
  return ownPayruns(payruns, emp.id)
    .map((run) => ({
      run,
      row: run.rows.find((item) => item.empId === emp.id),
    }))
    .filter((item): item is { run: Payrun row: PayrunInputRow } =>
      Boolean(item.row),
    )
    .sort((a, b) =>
      a.run.year !== b.run.year
        ? a.run.year - b.run.year
        : a.run.month - b.run.month,
    )
}

function EmployeeMetricCard({
  label,
  value,
  sub,
  accent,
  badgeText,
  badgeBg,
  badgeColor,
  icon,
  progress,
}: {
  label: string
  value: string
  sub: string
  accent: string
  badgeText?: string
  badgeBg?: string
  badgeColor?: string
  icon?: string
  progress?: number
}) {
  return (
    <div
      style={{
        background: F.card,
        border: `1px solid ${F.border}`,
        borderRadius: 8,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent,
        }}
      />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              color: F.text2,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
          {badgeText && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 12,
                background: badgeBg || F.pageBg,
                color: badgeColor || F.text2,
                border: `1px solid ${accent}25`,
              }}
            >
              {badgeText}
            </span>
          )}
        </div>
        <div
          style={{
            color: F.text1,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ color: F.text2, fontSize: 12, lineHeight: 1.4 }}>{sub}</div>
        {typeof progress === "number" && (
          <div
            style={{
              marginTop: 10,
              height: 4,
              borderRadius: 2,
              background: F.pageBg,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
                height: "100%",
                background: accent,
                borderRadius: 2,
                transition: "width 0.6s ease",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function useDelayedLoad(ms = 350) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), ms)
    return () => clearTimeout(t)
  }, [ms])
  return ready
}

function SkeletonCard({ height = 104 }: { height?: number }) {
  return (
    <div
      style={{
        height,
        background: F.card,
        border: `1px solid ${F.border}`,
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: `linear-gradient(90deg, ${F.pageBg} 0%, #E9ECEF 50%, ${F.pageBg} 100%)`,
          backgroundSize: "200% 100%",
          animation: "dashShimmer 1.5s infinite",
        }}
      />
    </div>
  )
}

function AnalyticsDonutChart({
  segments,
  size = 170,
  strokeWidth = 28,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
  strokeWidth?: number
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const total = segments.reduce((s, seg) => s + seg.value, 0)

  if (total === 0) {
    return (
      <div
        style={{
          color: F.text3,
          fontSize: 13,
          padding: 30,
          textAlign: "center",
        }}
      >
        No breakdown data available for this period
      </div>
    )
  }

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let accumulated = 0
  const activeSeg = hoveredIdx !== null ? segments[hoveredIdx] : null

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        flexWrap: "wrap",
        padding: "8px 0",
      }}
    >
      {/* SVG Chart */}
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)", overflow: "visible" }}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={F.pageBg}
            strokeWidth={strokeWidth}
          />
          {segments.map((seg, i) => {
            const pct = seg.value / total
            const dashLen = pct * circumference
            const offset = -(accumulated / total) * circumference
            accumulated += seg.value
            const isHovered = hoveredIdx === i

            return (
              <circle
                key={seg.label}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${Math.max(0, dashLen - 2)} ${circumference - Math.max(0, dashLen - 2)}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  cursor: "pointer",
                  transition: "stroke-width 0.2s ease, opacity 0.2s ease",
                  opacity: hoveredIdx !== null && !isHovered ? 0.45 : 1,
                }}
              />
            )
          })}
        </svg>

        {/* Center label */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            textAlign: "center",
            padding: 10,
          }}
        >
          {activeSeg ? (
            <>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: F.text2,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {activeSeg.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: F.text1,
                  marginTop: 2,
                }}
              >
                {inr(activeSeg.value)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: activeSeg.color,
                  fontWeight: 700,
                }}
              >
                {Math.round((activeSeg.value / total) * 100)}%
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: F.text2,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Total Gross
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: F.text1,
                  marginTop: 2,
                }}
              >
                {inr(total)}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: F.text3,
                  marginTop: 1,
                }}
              >
                100%
              </div>
            </>
          )}
        </div>
      </div>

      {/* Legend list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
          minWidth: 160,
        }}
      >
        {segments.map((seg, i) => {
          const isHovered = hoveredIdx === i
          const pct = Math.round((seg.value / total) * 100)
          return (
            <div
              key={seg.label}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderRadius: 6,
                background: isHovered ? F.pageBg : "transparent",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: seg.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: isHovered ? 700 : 500,
                    color: isHovered ? F.text1 : F.text2,
                  }}
                >
                  {seg.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: F.text1,
                  }}
                >
                  {inr(seg.value)}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: F.text3,
                    minWidth: 32,
                    textAlign: "right",
                  }}
                >
                  {pct}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DualBarTrendChart({
  data,
}: {
  data: {
    period: string
    gross: number
    deductions: number
    net: number
    status: string
  }[]
}) {
  const [viewMode, setViewMode] = useState<"both" | "net" | "gross">("both")
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  if (data.length === 0) {
    return (
      <div
        style={{
          color: F.text3,
          fontSize: 13,
          padding: 40,
          textAlign: "center",
        }}
      >
        No payroll trend data available
      </div>
    )
  }

  const maxVal = Math.max(
    ...data.map((d) => (viewMode === "net" ? d.net : d.gross)),
    50000,
  )
  const chartH = 180
  const yTicks = [
    maxVal,
    Math.round((maxVal * 0.75) / 1000) * 1000,
    Math.round((maxVal * 0.5) / 1000) * 1000,
    Math.round((maxVal * 0.25) / 1000) * 1000,
    0,
  ]

  return (
    <div>
      {/* Header controls & legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {(viewMode === "both" || viewMode === "gross") && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "#93C5FD",
                }}
              />
              <span style={{ fontSize: 12, color: F.text2, fontWeight: 500 }}>
                Gross Salary
              </span>
            </div>
          )}
          {(viewMode === "both" || viewMode === "net") && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: F.brand,
                }}
              />
              <span style={{ fontSize: 12, color: F.text2, fontWeight: 500 }}>
                Net Pay (Take-Home)
              </span>
            </div>
          )}
        </div>

        {/* View mode toggle button pills */}
        <div
          style={{
            display: "inline-flex",
            background: F.pageBg,
            padding: 2,
            borderRadius: 6,
            border: `1px solid ${F.border}`,
          }}
        >
          {(
            [
              ["both", "Combined"],
              ["net", "Net Pay"],
              ["gross", "Gross Pay"],
            ] as const
          ).map(([key, title]) => {
            const active = viewMode === key
            return (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                style={{
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  background: active ? F.card : "transparent",
                  color: active ? F.brand : F.text2,
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  boxShadow: active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Chart Canvas with Y-axis and Bars */}
      <div style={{ display: "flex", gap: 8, height: chartH + 34, position: "relative" }}>
        {/* Y-axis labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: chartH,
            paddingRight: 6,
            minWidth: 46,
            textAlign: "right",
          }}
        >
          {yTicks.map((val, idx) => (
            <span
              key={idx}
              style={{
                fontSize: 10,
                color: F.text3,
                lineHeight: 1,
              }}
            >
              {val >= 1000 ? `₹${Math.round(val / 1000)}k` : `₹${val}`}
            </span>
          ))}
        </div>

        {/* Bars Container */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Horizontal Gridlines */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: chartH,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px ${i === 4 ? "solid" : "dashed"} ${F.border}`,
                  width: "100%",
                }}
              />
            ))}
          </div>

          {/* Bar Columns */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: chartH,
              position: "relative",
              zIndex: 1,
            }}
          >
            {data.map((d, i) => {
              const grossH = Math.max(6, (d.gross / maxVal) * chartH)
              const netH = Math.max(6, (d.net / maxVal) * chartH)
              const isHovered = hoveredIdx === i

              return (
                <div
                  key={d.period}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {/* Floating tooltip on hover */}
                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: Math.max(grossH, netH) + 12,
                        background: "#1E293B",
                        color: "#FFFFFF",
                        padding: "8px 12px",
                        borderRadius: 6,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                        fontSize: 11,
                        whiteSpace: "nowrap",
                        zIndex: 20,
                        pointerEvents: "none",
                        lineHeight: 1.4,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 12,
                          marginBottom: 3,
                          color: "#F8FAFC",
                        }}
                      >
                        {d.period} ({d.status})
                      </div>
                      <div style={{ color: "#94A3B8" }}>
                        Gross:{" "}
                        <strong style={{ color: "#93C5FD" }}>
                          {inr(d.gross)}
                        </strong>
                      </div>
                      <div style={{ color: "#94A3B8" }}>
                        Deductions:{" "}
                        <strong style={{ color: "#FCA5A5" }}>
                          {inr(d.deductions)}
                        </strong>
                      </div>
                      <div
                        style={{
                          color: "#94A3B8",
                          borderTop: "1px solid #334155",
                          paddingTop: 3,
                          marginTop: 3,
                        }}
                      >
                        Net Take-Home:{" "}
                        <strong style={{ color: "#4ADE80" }}>
                          {inr(d.net)}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Bars */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 3,
                      width: "100%",
                      maxWidth: viewMode === "both" ? 44 : 26,
                      justifyContent: "center",
                    }}
                  >
                    {(viewMode === "both" || viewMode === "gross") && (
                      <div
                        style={{
                          flex: 1,
                          height: grossH,
                          background: isHovered
                            ? "#60A5FA"
                            : "linear-gradient(180deg, #93C5FD 0%, #60A5FA 100%)",
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.4s ease, background 0.2s ease",
                        }}
                      />
                    )}
                    {(viewMode === "both" || viewMode === "net") && (
                      <div
                        style={{
                          flex: 1,
                          height: netH,
                          background: isHovered
                            ? F.brandHover
                            : `linear-gradient(180deg, ${F.brand} 0%, ${F.brandHover} 100%)`,
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.4s ease, background 0.2s ease",
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 8,
              height: 20,
            }}
          >
            {data.map((d, i) => {
              const parts = d.period.split(" ")
              const shortLabel = parts[0]?.slice(0, 3) || d.period
              const isHovered = hoveredIdx === i

              return (
                <div
                  key={d.period}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: isHovered ? 700 : 500,
                    color: isHovered ? F.brand : F.text2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {shortLabel}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SalaryDistributionBar({
  structure,
}: {
  structure?: SalaryStructure
}) {
  if (!structure) {
    return (
      <div style={{ color: F.text3, fontSize: 12, padding: 10 }}>
        No salary structure linked
      </div>
    )
  }

  const components = [
    { label: "Basic Pay", value: Number(structure.basic), color: F.brand },
    { label: "HRA", value: Number(structure.hra), color: "#00A389" },
    {
      label: "Fixed Allowance",
      value: Number(structure.fixedAllowance),
      color: "#F59E0B",
    },
    {
      label: "Special Allowance",
      value: Number(structure.specialAllowance),
      color: "#8B5CF6",
    },
  ]

  const total = components.reduce((s, c) => s + c.value, 0)
  if (total === 0) return null

  return (
    <div>
      {/* Horizontal stacked progress bar */}
      <div
        style={{
          display: "flex",
          height: 10,
          borderRadius: 6,
          overflow: "hidden",
          background: F.pageBg,
          gap: 2,
        }}
      >
        {components.map((c) => {
          const pct = (c.value / total) * 100
          return (
            <div
              key={c.label}
              style={{
                width: `${pct}%`,
                background: c.color,
                transition: "width 0.5s ease",
              }}
              title={`${c.label}: ${inr(c.value)} (${Math.round(pct)}%)`}
            />
          )
        })}
      </div>

      {/* Aligned items below */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 16px",
          marginTop: 14,
        }}
      >
        {components.map((c) => {
          const pct = Math.round((c.value / total) * 100)
          return (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: c.color,
                  }}
                />
                <span style={{ color: F.text2 }}>{c.label}</span>
              </div>
              <div style={{ fontWeight: 700, color: F.text1 }}>
                {inr(c.value)}{" "}
                <span style={{ color: F.text3, fontSize: 10, fontWeight: 500 }}>
                  ({pct}%)
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EmployeeDashboardView({
  emp,
  payruns,
  structures,
  onNav,
}: {
  emp: Employee
  payruns: Payrun[]
  structures: SalaryStructure[]
  onNav: (view: string) => void
}) {
  const ready = useDelayedLoad(350)
  const { text: greeting, icon: greetingIcon } = getTimeGreeting()
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const rows = employeeRows(emp, payruns)
  const completed = rows.filter((item) => item.run.status === "Completed")
  const latestCompleted = completed[completed.length - 1] ?? rows[rows.length - 1]
  const salary = structures.find((item) => item.name === emp.salaryStructure)

  // Financial year scope (April–March)
  const now = new Date()
  const fyStartYear =
    now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
  const isFY = (run: Payrun) =>
    (run.year === fyStartYear && run.month >= 4) ||
    (run.year === fyStartYear + 1 && run.month <= 3)
  const fyRows = rows.filter(
    (item) => isFY(item.run) && item.run.status === "Completed",
  )

  // YTD calculations
  const ytdGross = fyRows.reduce(
    (sum, item) => sum + item.row.totalEarnings,
    0,
  )
  const ytdDeductions = fyRows.reduce(
    (sum, item) => sum + item.row.totalDeductions,
    0,
  )
  const ytdNet = fyRows.reduce((sum, item) => sum + item.row.netSalary, 0)
  const ytdLopDays = fyRows.reduce((sum, item) => sum + item.row.lopDays, 0)
  const ytdLopAmount = fyRows.reduce(
    (sum, item) => sum + item.row.lopDeduction,
    0,
  )

  // Trend dataset (Last 12 months)
  const trendData = rows.slice(-12).map(({ run, row }) => ({
    period: run.period,
    gross: row.totalEarnings,
    deductions: row.totalDeductions,
    net: row.netSalary,
    status: run.status,
  }))

  // Donut chart segments for latest completed payslip
  const donutSegments = latestCompleted
    ? [
        {
          label: "Take-Home Net",
          value: latestCompleted.row.netSalary,
          color: F.success,
        },
        { label: "Provident Fund", value: latestCompleted.row.pf, color: F.brand },
        { label: "Income Tax (TDS)", value: latestCompleted.row.tds, color: F.warning },
        {
          label: "Professional Tax",
          value: latestCompleted.row.profTax,
          color: "#8B5CF6",
        },
        ...(latestCompleted.row.esi > 0
          ? [{ label: "ESI Deduction", value: latestCompleted.row.esi, color: "#64748B" }]
          : []),
        ...(latestCompleted.row.lopDeduction > 0
          ? [
              {
                label: "LOP Deduction",
                value: latestCompleted.row.lopDeduction,
                color: F.error,
              },
            ]
          : []),
      ]
    : []

  // Recent payroll status
  const recentPayruns = rows.slice().reverse().slice(0, 3)

  const cardStyle: React.CSSProperties = {
    background: F.card,
    border: `1px solid ${F.border}`,
    borderRadius: 8,
    padding: "20px 22px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
  }

  const deductionRatio = ytdGross > 0 ? Math.round((ytdDeductions / ytdGross) * 100) : 0
  const takeHomeRatio = ytdGross > 0 ? Math.round((ytdNet / ytdGross) * 100) : 0

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Top Header Profile & Status Banner ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${F.brand}, #0854A0)`,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 2px 8px rgba(0,112,242,0.25)",
            }}
          >
            {emp.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: F.text2,
                }}
              >
                EMPLOYEE WORKSPACE
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: F.brand,
                  background: F.infoBg,
                  padding: "2px 10px",
                  borderRadius: 12,
                }}
              >
                {todayFormatted}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{greetingIcon}</span>
              <h1
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 800,
                  color: F.text1,
                  letterSpacing: "-0.01em",
                }}
              >
                {greeting}, <span style={{ fontWeight: 800 }}>{emp.name.split(" ")[0]}</span>
              </h1>
              <Badge
                label={emp.status}
                color={F.success}
                bg={F.successBg}
                dot={F.success}
              />
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                color: F.text2,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span>{emp.designation}</span>
              <span>&bull;</span>
              <span>{emp.department}</span>
              <span>&bull;</span>
              <span>{emp.location}</span>
              <span>&bull;</span>
              <span style={{ color: F.text3 }}>ID: {emp.id}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              textAlign: "right",
              paddingRight: 12,
              borderRight: `1px solid ${F.border}`,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: F.text3 }}>
              FINANCIAL YEAR
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: F.text1,
                marginTop: 2,
              }}
            >
              FY {fyStartYear}&ndash;{(fyStartYear + 1).toString().slice(2)}
            </div>
          </div>
          {latestCompleted && (
            <Btn
              onClick={() => onNav("payslips")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 700,
              }}
            >
              <span>View Latest Payslip</span>
              <span style={{ fontSize: 14 }}>&rarr;</span>
            </Btn>
          )}
        </div>
      </div>

      {/* ── KPI Metric Summary Cards Grid (4 Columns) ── */}
      {!ready ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} height={124} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <EmployeeMetricCard
            label="YTD Gross Earnings"
            value={inr(ytdGross)}
            sub={`${fyRows.length} completed payruns in FY ${fyStartYear}-${(fyStartYear + 1).toString().slice(2)}`}
            accent={F.brand}
            badgeText="Gross"
            badgeBg={F.infoBg}
            badgeColor={F.brand}
            progress={100}
          />
          <EmployeeMetricCard
            label="YTD Total Deductions"
            value={inr(ytdDeductions)}
            sub={`${deductionRatio}% statutory & tax deductions from gross`}
            accent={F.warning}
            badgeText={`${deductionRatio}% Ratio`}
            badgeBg={F.warningBg}
            badgeColor={F.warning}
            progress={deductionRatio}
          />
          <EmployeeMetricCard
            label="YTD Net Take-Home"
            value={inr(ytdNet)}
            sub={`${takeHomeRatio}% net realization across FY`}
            accent={F.success}
            badgeText="Take-Home"
            badgeBg={F.successBg}
            badgeColor={F.success}
            progress={takeHomeRatio}
          />
          <EmployeeMetricCard
            label="Loss Of Pay (LOP)"
            value={`${ytdLopDays} ${ytdLopDays === 1 ? "Day" : "Days"}`}
            sub={
              ytdLopAmount > 0
                ? `${inr(ytdLopAmount)} total salary deduction`
                : "Perfect attendance record this FY"
            }
            accent={ytdLopDays > 0 ? F.error : "#00A389"}
            badgeText={ytdLopDays > 0 ? "LOP Impact" : "No Deductions"}
            badgeBg={ytdLopDays > 0 ? F.errorBg : "#E6F4EA"}
            badgeColor={ytdLopDays > 0 ? F.error : "#137333"}
          />
        </div>
      )}

      {/* ── Main Analytics Section: Dual Bar Trend + Donut Breakdown ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.95fr)",
          gap: 20,
        }}
      >
        {/* Left Card: Monthly Trend Bar Graph */}
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  color: F.text1,
                }}
              >
                Earnings & Net Pay Trend
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: F.text2,
                }}
              >
                Monthly Gross salary vs Net Take-Home pay over recent pay cycles
              </p>
            </div>
            <div
              style={{
                fontSize: 11,
                color: F.text3,
                fontWeight: 600,
                background: F.pageBg,
                padding: "3px 8px",
                borderRadius: 4,
              }}
            >
              Last 12 Months
            </div>
          </div>
          {!ready ? (
            <SkeletonCard height={240} />
          ) : (
            <DualBarTrendChart data={trendData} />
          )}
        </section>

        {/* Right Card: Donut / Pie Chart Breakdown */}
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  color: F.text1,
                }}
              >
                Period Breakdown
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: F.text2,
                }}
              >
                {latestCompleted?.run.period ?? "Latest cycle"} salary composition
              </p>
            </div>
            {latestCompleted && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: F.brand,
                  background: F.infoBg,
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {latestCompleted.run.period}
              </span>
            )}
          </div>
          {!ready ? (
            <SkeletonCard height={240} />
          ) : (
            <AnalyticsDonutChart segments={donutSegments} />
          )}
        </section>
      </div>

      {/* ── Lower Section: Recent Payslips Ledger + Right Side Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 1fr)",
          gap: 20,
        }}
      >
        {/* Left: Recent Payslips Table */}
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  color: F.text1,
                }}
              >
                Recent Payslips
              </h2>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: 12,
                  color: F.text2,
                }}
              >
                Verified historical pay run receipts and net disbursements
              </p>
            </div>
            <Btn small variant="secondary" onClick={() => onNav("payslips")}>
              View All Payslips
            </Btn>
          </div>

          {!ready ? (
            <SkeletonCard height={180} />
          ) : completed.length === 0 ? (
            <div
              style={{
                color: F.text3,
                fontSize: 13,
                padding: "30px 0",
                textAlign: "center",
              }}
            >
              No completed payslips recorded yet.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${F.border}`,
                      color: F.text2,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <th style={{ padding: "8px 6px" }}>Period</th>
                    <th style={{ padding: "8px 6px", textAlign: "right" }}>
                      Gross
                    </th>
                    <th style={{ padding: "8px 6px", textAlign: "right" }}>
                      Deductions
                    </th>
                    <th style={{ padding: "8px 6px", textAlign: "right" }}>
                      Net Pay
                    </th>
                    <th style={{ padding: "8px 6px", textAlign: "center" }}>
                      Status
                    </th>
                    <th style={{ padding: "8px 6px", textAlign: "right" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completed
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map(({ run, row }) => (
                      <tr
                        key={run.id}
                        style={{
                          borderBottom: `1px solid ${F.border}60`,
                          transition: "background 0.15s ease",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 6px",
                            fontWeight: 700,
                            color: F.text1,
                          }}
                        >
                          {run.period}
                        </td>
                        <td
                          style={{
                            padding: "12px 6px",
                            textAlign: "right",
                            color: F.text2,
                          }}
                        >
                          {inr(row.totalEarnings)}
                        </td>
                        <td
                          style={{
                            padding: "12px 6px",
                            textAlign: "right",
                            color: F.warning,
                          }}
                        >
                          {inr(row.totalDeductions)}
                        </td>
                        <td
                          style={{
                            padding: "12px 6px",
                            textAlign: "right",
                            fontWeight: 800,
                            color: F.success,
                          }}
                        >
                          {inr(row.netSalary)}
                        </td>
                        <td
                          style={{
                            padding: "12px 6px",
                            textAlign: "center",
                          }}
                        >
                          {prBadge(run.status)}
                        </td>
                        <td
                          style={{
                            padding: "12px 6px",
                            textAlign: "right",
                          }}
                        >
                          <button
                            onClick={() => onNav("payslips")}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: F.brand,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: 12,
                              padding: "4px 8px",
                              borderRadius: 4,
                            }}
                          >
                            Open &rarr;
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Right: Salary Structure & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Salary Structure Distribution */}
          <section style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 800,
                    color: F.text1,
                  }}
                >
                  Salary Structure
                </h2>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 12,
                    color: F.text2,
                  }}
                >
                  {emp.salaryStructure}
                </p>
              </div>
              <Btn small variant="secondary" onClick={() => onNav("salary")}>
                View Breakdown
              </Btn>
            </div>

            {!ready ? (
              <SkeletonCard height={140} />
            ) : (
              <SalaryDistributionBar structure={salary} />
            )}
          </section>

          {/* Payroll Run Cycle Status Tracker */}
          <section style={cardStyle}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: F.text2,
                marginBottom: 12,
              }}
            >
              Payroll Processing Status
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentPayruns.map(({ run }) => (
                <div
                  key={run.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    background: F.pageBg,
                    borderRadius: 6,
                    border: `1px solid ${F.border}80`,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: F.text1,
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {run.period}
                    </div>
                    <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                      Year {run.year} &bull; Month {run.month}
                    </div>
                  </div>
                  {prBadge(run.status)}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Access Shortcuts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <button
              onClick={() => onNav("salary")}
              style={{
                background: F.card,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <div
                style={{
                  color: F.brand,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Salary Details &rarr;
              </div>
              <div style={{ color: F.text2, fontSize: 11, marginTop: 4 }}>
                Review component breakdown
              </div>
            </button>
            <button
              onClick={() => onNav("financial")}
              style={{
                background: F.card,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <div
                style={{
                  color: F.brand,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Tax & Declarations &rarr;
              </div>
              <div style={{ color: F.text2, fontSize: 11, marginTop: 4 }}>
                Regimes and proofs
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MySalaryView({
  emp,
  structures,
  onNav,
}: {
  emp: Employee
  structures: SalaryStructure[]
  onNav?: (view: string) => void
}) {
  const [componentSearch, setComponentSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "earnings" | "deductions">("all")
  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly")
  const [showAnnexure, setShowAnnexure] = useState(false)

  const s = structures.find((item) => item.name === emp.salaryStructure)
  const multiplier = viewMode === "annual" ? 12 : 1

  // Base earnings components
  const earningsComponents = s
    ? [
        {
          name: "Basic Salary",
          category: "Fixed Earnings",
          monthly: Number(s.basic),
          annual: Number(s.basic) * 12,
          taxability: "Taxable as per Income Tax Slabs",
          color: F.brand,
        },
        {
          name: "House Rent Allowance (HRA)",
          category: "Fixed Allowance",
          monthly: Number(s.hra),
          annual: Number(s.hra) * 12,
          taxability: "Exempt u/s 10(13A) on actual rent paid (Old Regime)",
          color: "#00A389",
        },
        {
          name: "Fixed Allowance",
          category: "Supplementary Allowance",
          monthly: Number(s.fixedAllowance),
          annual: Number(s.fixedAllowance) * 12,
          taxability: "Fully Taxable",
          color: "#F59E0B",
        },
        {
          name: "Special Allowance",
          category: "Performance / Role Allowance",
          monthly: Number(s.specialAllowance),
          annual: Number(s.specialAllowance) * 12,
          taxability: "Fully Taxable",
          color: "#8B5CF6",
        },
      ]
    : []

  const totalMonthlyGross = earningsComponents.reduce((sum, c) => sum + c.monthly, 0) || emp.grossSalary
  const totalAnnualGross = totalMonthlyGross * 12

  // Statutory deductions estimate
  const pfMonthly = Math.round(Number(s?.basic || 0) * 0.12) || 7200
  const ptMonthly = 200
  const estTdsMonthly = Math.round(totalMonthlyGross * 0.08)
  const totalMonthlyDeductions = pfMonthly + ptMonthly + estTdsMonthly
  const totalAnnualDeductions = totalMonthlyDeductions * 12

  const deductionComponents = [
    {
      name: "Provident Fund (Employee PF)",
      type: "Statutory",
      monthly: pfMonthly,
      annual: pfMonthly * 12,
      act: "EPF Act, 1952 (12% of Basic)",
      note: "Deposited to EPFO member account",
    },
    {
      name: "Professional Tax (PT)",
      type: "Statutory",
      monthly: ptMonthly,
      annual: ptMonthly * 12,
      act: "State Professional Tax Act",
      note: "Standard monthly state contribution",
    },
    {
      name: "Income Tax Estimate (TDS)",
      type: "Tax Deduction",
      monthly: estTdsMonthly,
      annual: estTdsMonthly * 12,
      act: "Income Tax Act, 1961 (Sec 192)",
      note: "Projected monthly tax withholding",
    },
  ]

  // F4 Value Help list
  const f4Values = [
    "Basic Salary",
    "House Rent Allowance (HRA)",
    "Fixed Allowance",
    "Special Allowance",
    "Provident Fund (Employee PF)",
    "Professional Tax (PT)",
    "Income Tax Estimate (TDS)",
  ]

  // Filtered earnings
  const filteredEarnings = earningsComponents.filter((c) => {
    if (categoryFilter === "deductions") return false
    if (!componentSearch) return true
    const searchLower = componentSearch.toLowerCase()
    return (
      c.name.toLowerCase().includes(searchLower) ||
      c.category.toLowerCase().includes(searchLower)
    )
  })

  // Filtered deductions
  const filteredDeductions = deductionComponents.filter((d) => {
    if (categoryFilter === "earnings") return false
    if (!componentSearch) return true
    const searchLower = componentSearch.toLowerCase()
    return (
      d.name.toLowerCase().includes(searchLower) ||
      d.type.toLowerCase().includes(searchLower)
    )
  })

  const hasFilter = Boolean(componentSearch || categoryFilter !== "all")
  const estMonthlyTakeHome = totalMonthlyGross - totalMonthlyDeductions
  const estAnnualTakeHome = totalAnnualGross - totalAnnualDeductions

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Page Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            My Salary & Compensation
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Current structure: <strong>{emp.salaryStructure}</strong> &bull; Employment: {emp.empType}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Monthly / Annual CTC Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: F.pageBg,
              padding: 2,
              borderRadius: 6,
              border: `1px solid ${F.border}`,
            }}
          >
            <button
              onClick={() => setViewMode("monthly")}
              style={{
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: viewMode === "monthly" ? 700 : 500,
                background: viewMode === "monthly" ? F.card : "transparent",
                color: viewMode === "monthly" ? F.brand : F.text2,
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: viewMode === "monthly" ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Monthly Breakdown
            </button>
            <button
              onClick={() => setViewMode("annual")}
              style={{
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: viewMode === "annual" ? 700 : 500,
                background: viewMode === "annual" ? F.card : "transparent",
                color: viewMode === "annual" ? F.brand : F.text2,
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: viewMode === "annual" ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Annualized (CTC)
            </button>
          </div>

          <Btn
            variant="secondary"
            onClick={() => setShowAnnexure(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}
          >
            <span>Compensation Annexure</span>
            <span style={{ fontSize: 14 }}>&darr;</span>
          </Btn>
        </div>
      </div>

      {/* ── 4 KPI Summary Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <EmployeeMetricCard
          label={viewMode === "annual" ? "Annual Gross CTC" : "Monthly Gross Salary"}
          value={inr(viewMode === "annual" ? totalAnnualGross : totalMonthlyGross)}
          sub="Fixed gross remuneration before statutory deductions"
          accent={F.brand}
          badgeText={viewMode === "annual" ? "Annual" : "Monthly"}
          badgeBg={F.infoBg}
          badgeColor={F.brand}
          progress={100}
        />
        <EmployeeMetricCard
          label={viewMode === "annual" ? "Est. Annual Deductions" : "Est. Monthly Deductions"}
          value={inr(viewMode === "annual" ? totalAnnualDeductions : totalMonthlyDeductions)}
          sub="Includes EPF (12%), Professional Tax & TDS withholding"
          accent={F.warning}
          badgeText="Statutory"
          badgeBg={F.warningBg}
          badgeColor={F.warning}
          progress={Math.round((totalMonthlyDeductions / totalMonthlyGross) * 100)}
        />
        <EmployeeMetricCard
          label={viewMode === "annual" ? "Est. Annual Take-Home" : "Est. Net Take-Home"}
          value={inr(viewMode === "annual" ? estAnnualTakeHome : estMonthlyTakeHome)}
          sub="Projected net realization credited to salary account"
          accent={F.success}
          badgeText="In-Hand"
          badgeBg={F.successBg}
          badgeColor={F.success}
          progress={Math.round((estMonthlyTakeHome / totalMonthlyGross) * 100)}
        />
        <EmployeeMetricCard
          label="Tax Regime Preference"
          value="New Regime"
          sub="Income Tax Sec 115BAC with Standard Deduction"
          accent="#8B5CF6"
          badgeText="Active"
          badgeBg="#F5F3FF"
          badgeColor="#7C3AED"
        />
      </div>

      {/* ── Visual Salary Proportional Distribution Bar ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "18px 22px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: F.text2,
            }}
          >
            Component Distribution Overview
          </span>
          <span style={{ fontSize: 12, color: F.text3 }}>
            Total Remuneration: {inr(viewMode === "annual" ? totalAnnualGross : totalMonthlyGross)}
          </span>
        </div>
        <SalaryDistributionBar structure={s} />
      </div>

      {/* ── Filters & F4 Search Bar ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {/* F4 Value Help Search */}
        <div style={{ flex: 2, minWidth: 260 }}>
          <ValueHelp
            label="Search Salary Component (F4 Search)"
            value={componentSearch}
            onChange={setComponentSearch}
            placeholder="Type or pick from F4 value help…"
            values={f4Values}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ flex: 1.5, minWidth: 240 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Category Filter
          </div>
          <div
            style={{
              display: "flex",
              background: F.pageBg,
              padding: 2,
              borderRadius: 6,
              border: `1px solid ${F.border}`,
            }}
          >
            {(
              [
                ["all", "All"],
                ["earnings", "Earnings Only"],
                ["deductions", "Deductions Only"],
              ] as const
            ).map(([cat, label]) => {
              const active = categoryFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    background: active ? F.card : "transparent",
                    color: active ? F.brand : F.text2,
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Reset Action */}
        {hasFilter && (
          <button
            onClick={() => {
              setComponentSearch("")
              setCategoryFilter("all")
            }}
            style={{
              background: F.pageBg,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              padding: "7px 14px",
              color: F.text2,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 34,
            }}
          >
            <span>&times;</span>
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* ── Earnings Component Table ── */}
      {(categoryFilter === "all" || categoryFilter === "earnings") && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: `linear-gradient(90deg, ${F.card}, ${F.infoBg})`,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                Earnings Components
              </h2>
              <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                Regular taxable and exempt monthly salary elements
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: F.brand,
                background: F.card,
                padding: "4px 10px",
                borderRadius: 20,
                border: `1px solid ${F.brand}30`,
              }}
            >
              {filteredEarnings.length} of {earningsComponents.length} components
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${F.border}`,
                    color: F.text2,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    background: F.pageBg,
                  }}
                >
                  <th style={{ padding: "10px 18px" }}>Component Name</th>
                  <th style={{ padding: "10px 14px" }}>Classification</th>
                  <th style={{ padding: "10px 14px", textAlign: "right" }}>
                    {viewMode === "annual" ? "Annual Amount" : "Monthly Amount"}
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right" }}>% of Gross</th>
                  <th style={{ padding: "10px 18px" }}>Taxability & Exemptions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: 30, textAlign: "center", color: F.text3 }}>
                      No earnings match the search filter "{componentSearch}"
                    </td>
                  </tr>
                ) : (
                  filteredEarnings.map((c) => {
                    const amount = c.monthly * multiplier
                    const pct = Math.round((c.monthly / totalMonthlyGross) * 100)
                    return (
                      <tr
                        key={c.name}
                        style={{
                          borderBottom: `1px solid ${F.border}60`,
                          transition: "background 0.12s ease",
                        }}
                      >
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 3,
                                background: c.color,
                                flexShrink: 0,
                              }}
                            />
                            <strong style={{ color: F.text1 }}>{c.name}</strong>
                          </div>
                        </td>
                        <td style={{ padding: "14px 14px", color: F.text2 }}>{c.category}</td>
                        <td
                          style={{
                            padding: "14px 14px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: F.text1,
                          }}
                        >
                          {inr(amount)}
                        </td>
                        <td
                          style={{
                            padding: "14px 14px",
                            textAlign: "right",
                            color: F.text3,
                            fontWeight: 600,
                          }}
                        >
                          {pct}%
                        </td>
                        <td style={{ padding: "14px 18px", color: F.text2, fontSize: 12 }}>
                          {c.taxability}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    background: F.pageBg,
                    borderTop: `2px solid ${F.border}`,
                    fontWeight: 800,
                  }}
                >
                  <td style={{ padding: "14px 18px", color: F.text1 }} colSpan={2}>
                    Total Gross Earnings
                  </td>
                  <td style={{ padding: "14px 14px", textAlign: "right", color: F.brand, fontSize: 15 }}>
                    {inr(viewMode === "annual" ? totalAnnualGross : totalMonthlyGross)}
                  </td>
                  <td style={{ padding: "14px 14px", textAlign: "right", color: F.brand }}>100%</td>
                  <td style={{ padding: "14px 18px", color: F.text3, fontSize: 11 }}>
                    Base for Income Tax calculation
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ── Deductions Component Table ── */}
      {(categoryFilter === "all" || categoryFilter === "deductions") && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: `linear-gradient(90deg, ${F.card}, ${F.warningBg})`,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                Statutory Deductions & Contributions
              </h2>
              <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                Mandatory withholdings deducted from monthly salary
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: F.warning,
                background: F.card,
                padding: "4px 10px",
                borderRadius: 20,
                border: `1px solid ${F.warning}30`,
              }}
            >
              {filteredDeductions.length} of {deductionComponents.length} items
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${F.border}`,
                    color: F.text2,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    background: F.pageBg,
                  }}
                >
                  <th style={{ padding: "10px 18px" }}>Deduction Item</th>
                  <th style={{ padding: "10px 14px" }}>Type</th>
                  <th style={{ padding: "10px 14px", textAlign: "right" }}>
                    {viewMode === "annual" ? "Annual Estimated" : "Monthly Estimated"}
                  </th>
                  <th style={{ padding: "10px 18px" }}>Regulatory Act / Mandate</th>
                  <th style={{ padding: "10px 18px" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeductions.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: 30, textAlign: "center", color: F.text3 }}>
                      No deductions match the search filter "{componentSearch}"
                    </td>
                  </tr>
                ) : (
                  filteredDeductions.map((d) => {
                    const amount = d.monthly * multiplier
                    return (
                      <tr
                        key={d.name}
                        style={{
                          borderBottom: `1px solid ${F.border}60`,
                          transition: "background 0.12s ease",
                        }}
                      >
                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: F.text1 }}>{d.name}</strong>
                        </td>
                        <td style={{ padding: "14px 14px", color: F.text2 }}>{d.type}</td>
                        <td
                          style={{
                            padding: "14px 14px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: F.warning,
                          }}
                        >
                          {inr(amount)}
                        </td>
                        <td style={{ padding: "14px 18px", color: F.text2, fontSize: 12 }}>
                          {d.act}
                        </td>
                        <td style={{ padding: "14px 18px", color: F.text3, fontSize: 12 }}>
                          {d.note}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    background: F.pageBg,
                    borderTop: `2px solid ${F.border}`,
                    fontWeight: 800,
                  }}
                >
                  <td style={{ padding: "14px 18px", color: F.text1 }} colSpan={2}>
                    Total Estimated Deductions
                  </td>
                  <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning, fontSize: 15 }}>
                    {inr(viewMode === "annual" ? totalAnnualDeductions : totalMonthlyDeductions)}
                  </td>
                  <td style={{ padding: "14px 18px", color: F.text3, fontSize: 11 }} colSpan={2}>
                    Directly subtracted from Gross to calculate Net Pay
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ── Read-only Notice & HR Contact Banner ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderLeft: `4px solid ${F.brand}`,
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <strong style={{ color: F.text1, fontSize: 14 }}>
            Official Compensation Record
          </strong>
          <div style={{ color: F.text2, fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
            Salary component structures are revised in accordance with corporate policy. For inquiries regarding allowances, tax declarations, or structure revisions, contact human resources.
          </div>
        </div>
        {onNav && (
          <Btn small variant="secondary" onClick={() => onNav("financial")}>
            Manage Tax Proofs &rarr;
          </Btn>
        )}
      </div>

      {/* ── Compensation Annexure Modal ── */}
      {showAnnexure && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowAnnexure(false)}
        >
          <div
            style={{
              background: F.card,
              borderRadius: 8,
              padding: 28,
              maxWidth: 680,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${F.border}`,
                paddingBottom: 14,
                marginBottom: 16,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 18, color: F.text1 }}>
                  Annexure A &mdash; Compensation Summary
                </h3>
                <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                  Employee: {emp.name} ({emp.id}) &bull; {emp.designation}
                </div>
              </div>
              <button
                onClick={() => setShowAnnexure(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: F.text3,
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Salary Structure:</span>
                <strong>{emp.salaryStructure}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Monthly Gross Salary:</span>
                <strong style={{ color: F.brand }}>{inr(totalMonthlyGross)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Annual Gross CTC:</span>
                <strong style={{ color: F.brand }}>{inr(totalAnnualGross)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Estimated Annual In-Hand:</span>
                <strong style={{ color: F.success }}>{inr(estAnnualTakeHome)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>PF Contribution (Employee):</span>
                <span>{inr(pfMonthly * 12)} / year</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${F.border}60` }}>
                <span style={{ color: F.text2 }}>Professional Tax:</span>
                <span>{inr(ptMonthly * 12)} / year</span>
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Btn variant="secondary" onClick={() => setShowAnnexure(false)}>
                Close
              </Btn>
              <Btn onClick={() => window.print()}>Print / Save Statement</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PayrollHistoryView({
  emp,
  payruns,
  onNav,
}: {
  emp: Employee
  payruns: Payrun[]
  onNav?: (view: string) => void
}) {
  const [periodSearch, setPeriodSearch] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [selectedRun, setSelectedRun] = useState<{
    run: Payrun
    row: PayrunInputRow
  } | null>(null)

  // Extract all completed and historical runs for this employee
  const runs = ownPayruns(payruns, emp.id)
    .map((run) => ({
      run,
      row: run.rows.find((item) => item.empId === emp.id)!,
    }))
    .filter((item) => Boolean(item.row))

  // F4 Value Help list for periods
  const f4Periods = Array.from(new Set(runs.map((r) => r.run.period)))
  const availableYears = Array.from(new Set(runs.map((r) => String(r.run.year)))).sort().reverse()

  // Apply filters
  const filteredRuns = runs
    .filter(({ run }) => {
      // F4 Period filter / search
      if (periodSearch) {
        if (!run.period.toLowerCase().includes(periodSearch.toLowerCase())) {
          return false
        }
      }
      // Year filter
      if (yearFilter !== "all" && String(run.year) !== yearFilter) {
        return false
      }
      // Status filter
      if (statusFilter !== "all" && run.status !== statusFilter) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      const aVal = a.run.year * 100 + a.run.month
      const bVal = b.run.year * 100 + b.run.month
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal
    })

  // Calculations for summary KPI cards
  const completedRuns = runs.filter((r) => r.run.status === "Completed")
  const totalDisbursedYtd = completedRuns.reduce((sum, r) => sum + r.row.netSalary, 0)
  const totalGrossYtd = completedRuns.reduce((sum, r) => sum + r.row.totalEarnings, 0)
  const avgMonthlyNet = completedRuns.length > 0 ? Math.round(totalDisbursedYtd / completedRuns.length) : 0
  const latestCompleted = completedRuns[completedRuns.length - 1]

  const hasActiveFilters = Boolean(periodSearch || yearFilter !== "all" || statusFilter !== "all")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Top Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            Payroll History & Disbursements
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Complete ledger of past compensation cycles, deductions, and payment receipts
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {onNav && (
            <Btn
              variant="secondary"
              onClick={() => onNav("payslips")}
              style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}
            >
              <span>Payslips Portal</span>
              <span style={{ fontSize: 14 }}>&rarr;</span>
            </Btn>
          )}
        </div>
      </div>

      {/* ── 4 KPI Summary Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <EmployeeMetricCard
          label="Completed Payroll Cycles"
          value={`${completedRuns.length} Cycles`}
          sub="Verified and finalized disbursements on file"
          accent={F.brand}
          badgeText="Disbursed"
          badgeBg={F.infoBg}
          badgeColor={F.brand}
          progress={100}
        />
        <EmployeeMetricCard
          label="Total Net Disbursed (YTD)"
          value={inr(totalDisbursedYtd)}
          sub={`From ${inr(totalGrossYtd)} total cumulative gross`}
          accent={F.success}
          badgeText="Take-Home"
          badgeBg={F.successBg}
          badgeColor={F.success}
          progress={totalGrossYtd > 0 ? Math.round((totalDisbursedYtd / totalGrossYtd) * 100) : 0}
        />
        <EmployeeMetricCard
          label="Avg. Monthly Take-Home"
          value={inr(avgMonthlyNet)}
          sub="Average in-hand salary per processed cycle"
          accent="#00A389"
          badgeText="Average"
          badgeBg="#E6F4EA"
          badgeColor="#137333"
        />
        <EmployeeMetricCard
          label="Latest Disbursed Period"
          value={latestCompleted?.run.period ?? "None"}
          sub={latestCompleted ? `Disbursed on ${fmtD(latestCompleted.run.generatedOn)}` : "No completed runs"}
          accent="#8B5CF6"
          badgeText="Latest"
          badgeBg="#F5F3FF"
          badgeColor="#7C3AED"
        />
      </div>

      {/* ── Filters & F4 Value Search Bar ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {/* F4 Value Help Search for Pay Period */}
        <div style={{ flex: 2, minWidth: 260 }}>
          <ValueHelp
            label="Search Pay Period (F4 Search)"
            value={periodSearch}
            onChange={setPeriodSearch}
            placeholder="Search or pick pay period (e.g. July 2026)…"
            values={f4Periods}
          />
        </div>

        {/* Year Filter */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Year
          </div>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            style={{ ...iSt, cursor: "pointer" }}
          >
            <option value="all">All Years</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                Year {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div style={{ flex: 1, minWidth: 150 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Run Status
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ ...iSt, cursor: "pointer" }}
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
            <option value="Under Review">Under Review</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Sort Order Toggle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Order
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            style={{
              background: F.pageBg,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              padding: "7px 12px",
              color: F.text1,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 34,
            }}
            title="Toggle Sort Order"
          >
            <span>{sortOrder === "desc" ? "Newest First ↓" : "Oldest First ↑"}</span>
          </button>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setPeriodSearch("")
              setYearFilter("all")
              setStatusFilter("all")
            }}
            style={{
              background: F.pageBg,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              padding: "7px 14px",
              color: F.text2,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 34,
            }}
          >
            <span>&times;</span>
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* ── Payroll History Table ── */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${F.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: F.card,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
              Historical Payroll Ledger
            </h2>
            <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
              Showing {filteredRuns.length} of {runs.length} recorded pay cycles
            </div>
          </div>
          {filteredRuns.length > 0 && (
            <span style={{ fontSize: 12, color: F.text3 }}>
              Click any row to open itemized disbursement details
            </span>
          )}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13, minWidth: 700 }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${F.border}`,
                  color: F.text2,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  background: F.pageBg,
                }}
              >
                <th style={{ padding: "10px 18px" }}>Pay Period</th>
                <th style={{ padding: "10px 14px" }}>Disbursed Date</th>
                <th style={{ padding: "10px 14px", textAlign: "right" }}>Gross Earnings</th>
                <th style={{ padding: "10px 14px", textAlign: "right" }}>Total Deductions</th>
                <th style={{ padding: "10px 14px", textAlign: "right" }}>Net Salary</th>
                <th style={{ padding: "10px 14px" }}>Reference</th>
                <th style={{ padding: "10px 14px", textAlign: "center" }}>Status</th>
                <th style={{ padding: "10px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: 48, textAlign: "center", color: F.text3 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: F.text2, marginBottom: 6 }}>
                      No payroll records match your filter criteria
                    </div>
                    <div style={{ fontSize: 12, color: F.text3 }}>
                      Try selecting another period with F4 search or reset your filters.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRuns.map(({ run, row }) => (
                  <tr
                    key={run.id}
                    onClick={() => setSelectedRun({ run, row })}
                    style={{
                      borderBottom: `1px solid ${F.border}60`,
                      cursor: "pointer",
                      transition: "background 0.12s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = F.pageBg
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800, color: F.text1 }}>{run.period}</div>
                      <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                        Month {run.month} &bull; {run.year}
                      </div>
                    </td>
                    <td style={{ padding: "14px 14px", color: F.text2 }}>
                      {fmtD(run.generatedOn)}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right", color: F.text2, fontWeight: 600 }}>
                      {inr(row.totalEarnings)}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning, fontWeight: 600 }}>
                      <span>{inr(row.totalDeductions)}</span>
                      {row.lopDays > 0 && (
                        <span
                          style={{
                            display: "block",
                            fontSize: 10,
                            color: F.error,
                            fontWeight: 700,
                          }}
                        >
                          ({row.lopDays}d LOP)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right", fontWeight: 800, color: F.success, fontSize: 14 }}>
                      {inr(row.netSalary)}
                    </td>
                    <td style={{ padding: "14px 14px", color: F.text3, fontSize: 11 }}>
                      PR-{run.id.slice(0, 8)}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      {prBadge(run.status)}
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedRun({ run, row })
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: F.brand,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: 12,
                          padding: "4px 8px",
                          borderRadius: 4,
                        }}
                      >
                        Details &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SlidePanel / Drawer for Itemized Payrun Details ── */}
      {selectedRun && (
        <SlidePanel
          title={`Disbursement Details &mdash; ${selectedRun.run.period}`}
          sub={`Status: ${selectedRun.run.status} &bull; Processed on ${fmtD(selectedRun.run.generatedOn)}`}
          onClose={() => setSelectedRun(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Net Amount Banner */}
            <div
              style={{
                background: `linear-gradient(135deg, ${F.successBg}, #E8F5E9)`,
                border: `1px solid ${F.success}30`,
                borderRadius: 8,
                padding: "18px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase" }}>
                  Net Take-Home Disbursed
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: F.success, marginTop: 4 }}>
                  {inr(selectedRun.row.netSalary)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                {prBadge(selectedRun.run.status)}
                <div style={{ fontSize: 11, color: F.text3, marginTop: 4 }}>
                  Ref: PR-{selectedRun.run.id}
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div
              style={{
                background: F.pageBg,
                borderRadius: 8,
                padding: "16px 18px",
                border: `1px solid ${F.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: F.text2,
                  marginBottom: 10,
                }}
              >
                Earnings Breakdown
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: F.text2 }}>Gross Base Salary:</span>
                  <strong>{inr(selectedRun.row.grossSalary)}</strong>
                </div>
                {selectedRun.row.bonus > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: F.text2 }}>Bonus:</span>
                    <strong style={{ color: F.brand }}>+{inr(selectedRun.row.bonus)}</strong>
                  </div>
                )}
                {selectedRun.row.incentive > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: F.text2 }}>Incentive:</span>
                    <strong style={{ color: F.brand }}>+{inr(selectedRun.row.incentive)}</strong>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: `1px solid ${F.border}`,
                    paddingTop: 8,
                    fontWeight: 700,
                  }}
                >
                  <span>Total Earnings:</span>
                  <span style={{ color: F.brand }}>{inr(selectedRun.row.totalEarnings)}</span>
                </div>
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div
              style={{
                background: F.pageBg,
                borderRadius: 8,
                padding: "16px 18px",
                border: `1px solid ${F.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: F.text2,
                  marginBottom: 10,
                }}
              >
                Statutory & Other Deductions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: F.text2 }}>Provident Fund (EPF):</span>
                  <strong>{inr(selectedRun.row.pf)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: F.text2 }}>TDS (Income Tax):</span>
                  <strong>{inr(selectedRun.row.tds)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: F.text2 }}>Professional Tax:</span>
                  <strong>{inr(selectedRun.row.profTax)}</strong>
                </div>
                {selectedRun.row.esi > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: F.text2 }}>ESI Contribution:</span>
                    <strong>{inr(selectedRun.row.esi)}</strong>
                  </div>
                )}
                {selectedRun.row.lopDeduction > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: F.error }}>Loss of Pay ({selectedRun.row.lopDays} days):</span>
                    <strong style={{ color: F.error }}>-{inr(selectedRun.row.lopDeduction)}</strong>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: `1px solid ${F.border}`,
                    paddingTop: 8,
                    fontWeight: 700,
                  }}
                >
                  <span>Total Deductions:</span>
                  <span style={{ color: F.warning }}>{inr(selectedRun.row.totalDeductions)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {onNav && (
                <Btn
                  onClick={() => {
                    setSelectedRun(null)
                    onNav("payslips")
                  }}
                  style={{ flex: 1 }}
                >
                  Open Full Payslip
                </Btn>
              )}
              <Btn variant="secondary" onClick={() => setSelectedRun(null)}>
                Close
              </Btn>
            </div>
          </div>
        </SlidePanel>
      )}
    </div>
  )
}

function EmployeePayslipsView({
  emp,
  payruns,
}: {
  emp: Employee
  payruns: Payrun[]
}) {
  const [selected, setSelected] = useState<{
    run: Payrun
    row: PayrunInputRow
  } | null>(null)
  const [periodSearch, setPeriodSearch] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")

  const runs = ownPayruns(payruns, emp.id).filter(
    (r) => r.status === "Completed",
  )

  const f4Periods = Array.from(new Set(runs.map((r) => r.period)))
  const availableYears = Array.from(
    new Set(runs.map((r) => String(r.year))),
  ).sort().reverse()

  const filteredRuns = runs.filter((run) => {
    if (periodSearch && !run.period.toLowerCase().includes(periodSearch.toLowerCase())) {
      return false
    }
    if (selectedYear !== "all" && String(run.year) !== selectedYear) {
      return false
    }
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            My Payslips
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Secure digital payslip archive & salary statements
          </p>
        </div>
        <div style={{ fontSize: 12, color: F.text3, fontWeight: 600 }}>
          {filteredRuns.length} Payslip{filteredRuns.length !== 1 ? "s" : ""} Available
        </div>
      </div>

      {/* Filter & F4 Search Toolbar */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ flex: 2, minWidth: 240 }}>
          <ValueHelp
            label="Search Pay Period (F4 Search)"
            value={periodSearch}
            onChange={setPeriodSearch}
            placeholder="Search period (e.g. July 2026)…"
            values={f4Periods}
          />
        </div>

        <div style={{ width: 140 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Filter Year
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ ...iSt, cursor: "pointer" }}
          >
            <option value="all">All Years</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {(periodSearch || selectedYear !== "all") && (
          <button
            onClick={() => {
              setPeriodSearch("")
              setSelectedYear("all")
            }}
            style={{
              background: F.pageBg,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              padding: "7px 12px",
              color: F.text2,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              height: 34,
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Payslips Table */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620, fontSize: 13 }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${F.border}`,
                background: F.pageBg,
                color: F.text2,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <th style={{ padding: "12px 18px", textAlign: "left" }}>Pay Period</th>
              <th style={{ padding: "12px 14px", textAlign: "right" }}>Gross Earnings</th>
              <th style={{ padding: "12px 14px", textAlign: "right" }}>Deductions</th>
              <th style={{ padding: "12px 14px", textAlign: "right" }}>Net Take-Home</th>
              <th style={{ padding: "12px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRuns.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: "center", color: F.text3 }}>
                  No payslips match your search criteria.
                </td>
              </tr>
            ) : (
              filteredRuns.map((run) => {
                const row = run.rows.find((r) => r.empId === emp.id)!
                return (
                  <tr
                    key={run.id}
                    onClick={() => setSelected({ run, row })}
                    style={{
                      borderBottom: `1px solid ${F.border}60`,
                      cursor: "pointer",
                      transition: "background 0.12s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = F.pageBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800, color: F.text1 }}>{run.period}</div>
                      <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                        Generated: {fmtD(run.generatedOn)}
                      </div>
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right", color: F.text2, fontWeight: 600 }}>
                      {inr(row.totalEarnings)}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right", color: F.warning, fontWeight: 600 }}>
                      {inr(row.totalDeductions)}
                    </td>
                    <td style={{ padding: "14px 14px", textAlign: "right" }}>
                      <strong style={{ color: F.success, fontSize: 14 }}>
                        {inr(row.netSalary)}
                      </strong>
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <Btn
                        small
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected({ run, row })
                        }}
                      >
                        View Payslip &rarr;
                      </Btn>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal
          title={`Payslip Sheet — ${selected.run.period}`}
          onClose={() => setSelected(null)}
          wide
        >
          <PayslipSheet row={selected.row} run={selected.run} emp={emp} />
        </Modal>
      )}
    </div>
  )
}

function DocumentsView() {
  const [docSearch, setDocSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [previewDoc, setPreviewDoc] = useState<{
    name: string
    date: string
    type: string
    size: string
    desc: string
  } | null>(null)

  const docs = [
    {
      name: "Employment Offer Letter",
      date: "15 Mar 2021",
      type: "Employment",
      size: "420 KB",
      desc: "Official appointment contract and terms of employment.",
    },
    {
      name: "Annual Promotion & Appraisal Letter",
      date: "01 Apr 2024",
      type: "Career",
      size: "310 KB",
      desc: "Designation revision and compensation enhancement notification.",
    },
    {
      name: "Form 16 Tax Certificate (FY 2025-26)",
      date: "15 Jun 2026",
      type: "Tax",
      size: "850 KB",
      desc: "Part A & Part B TDS certificate issued under Section 203.",
    },
    {
      name: "Non-Disclosure Agreement (NDA)",
      date: "15 Mar 2021",
      type: "Compliance",
      size: "280 KB",
      desc: "Confidentiality agreement signed at onboarding.",
    },
  ]

  const categories = Array.from(new Set(docs.map((d) => d.type)))
  const f4DocNames = docs.map((d) => d.name)

  const filteredDocs = docs.filter((doc) => {
    if (docSearch && !doc.name.toLowerCase().includes(docSearch.toLowerCase())) {
      return false
    }
    if (categoryFilter !== "all" && doc.type !== categoryFilter) {
      return false
    }
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            My Documents
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            HR-issued employment letters, tax certificates, and compliance records
          </p>
        </div>
        <div style={{ fontSize: 12, color: F.text3, fontWeight: 600 }}>
          {filteredDocs.length} Document{filteredDocs.length !== 1 ? "s" : ""} Available
        </div>
      </div>

      {/* Filter & F4 Search Toolbar */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ flex: 2, minWidth: 240 }}>
          <ValueHelp
            label="Search Document Name (F4 Search)"
            value={docSearch}
            onChange={setDocSearch}
            placeholder="Search document name (e.g. Offer Letter)…"
            values={f4DocNames}
          />
        </div>

        <div style={{ width: 160 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: F.text2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Category Filter
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ ...iSt, cursor: "pointer" }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {(docSearch || categoryFilter !== "all") && (
          <button
            onClick={() => {
              setDocSearch("")
              setCategoryFilter("all")
            }}
            style={{
              background: F.pageBg,
              border: `1px solid ${F.border}`,
              borderRadius: 6,
              padding: "7px 12px",
              color: F.text2,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              height: 34,
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Documents Table */}
      <div
        style={{
          background: F.card,
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, fontSize: 13 }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${F.border}`,
                background: F.pageBg,
                color: F.text2,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <th style={{ padding: "12px 18px", textAlign: "left" }}>Document Title</th>
              <th style={{ padding: "12px 14px", textAlign: "left" }}>Issue Date</th>
              <th style={{ padding: "12px 14px", textAlign: "center" }}>Category</th>
              <th style={{ padding: "12px 14px", textAlign: "left" }}>File Format</th>
              <th style={{ padding: "12px 18px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 36, textAlign: "center", color: F.text3 }}>
                  No documents match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredDocs.map((doc) => (
                <tr
                  key={doc.name}
                  style={{
                    borderBottom: `1px solid ${F.border}60`,
                    transition: "background 0.12s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = F.pageBg)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 800, color: F.text1 }}>{doc.name}</div>
                    <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                      {doc.desc}
                    </div>
                  </td>
                  <td style={{ padding: "14px 14px", color: F.text2 }}>{doc.date}</td>
                  <td style={{ padding: "14px 14px", textAlign: "center" }}>
                    <Badge label={doc.type} color={F.brand} bg={F.infoBg} />
                  </td>
                  <td style={{ padding: "14px 14px", color: F.text3, fontSize: 12 }}>
                    PDF ({doc.size})
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <Btn small onClick={() => setPreviewDoc(doc)}>
                      View Document &rarr;
                    </Btn>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* SAP Fiori Info Note */}
      <div
        style={{
          padding: "14px 18px",
          borderLeft: `4px solid ${F.brand}`,
          background: F.card,
          border: `1px solid ${F.border}`,
          borderLeftColor: F.brand,
          borderRadius: 8,
          color: F.text2,
          fontSize: 12,
          lineHeight: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <strong style={{ color: F.text1 }}>Document Storage Policy:</strong> Documents issued by HR are read-only and digitally verified. New letters or tax forms appear automatically upon release.
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <Modal
          title={`Document Viewer — ${previewDoc.name}`}
          onClose={() => setPreviewDoc(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: F.pageBg,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: F.brand, textTransform: "uppercase" }}>
                {previewDoc.type} DOCUMENT
              </div>
              <h3 style={{ margin: "4px 0 6px", fontSize: 18, color: F.text1 }}>
                {previewDoc.name}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: F.text2 }}>
                Issued on {previewDoc.date} &bull; File Size: {previewDoc.size}
              </p>
            </div>

            <div
              style={{
                border: `1px dashed ${F.border}`,
                borderRadius: 8,
                padding: 40,
                textAlign: "center",
                background: F.card,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
              <strong style={{ color: F.text1, fontSize: 14, display: "block" }}>
                Digitally Signed & Verified Document
              </strong>
              <div style={{ color: F.text2, fontSize: 12, marginTop: 4 }}>
                {previewDoc.desc}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Btn variant="secondary" onClick={() => setPreviewDoc(null)}>
                Close
              </Btn>
              <Btn onClick={() => window.alert(`Downloading ${previewDoc.name}...`)}>
                Download PDF
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function FinancialDataView({
  emp,
  payruns,
}: {
  emp: Employee
  payruns: Payrun[]
}) {
  const toast = useToast()
  const [regime, setRegime] = useState("new")
  const [confirmModal, setConfirmModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"regime" | "declarations" | "deductions">("regime")

  const latest = ownPayruns(payruns, emp.id)
    .find((r) => r.status === "Completed")
    ?.rows.find((r) => r.empId === emp.id)

  const declarations = [
    { section: "Sec 80C", name: "Life Insurance & EPF", declared: "₹1,50,000", status: "Verified" },
    { section: "Sec 80D", name: "Health Insurance Premium", declared: "₹25,000", status: "Under Review" },
    { section: "Sec 24(b)", name: "Home Loan Interest", declared: "₹2,00,000", status: "Declared" },
    { section: "Sec 80CCD", name: "National Pension Scheme (NPS)", declared: "₹50,000", status: "Verified" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: F.text1,
              letterSpacing: "-0.01em",
            }}
          >
            Financial Data & Tax Portal
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: F.text2 }}>
            Income tax regime preference, investment declarations, and statutory withholdings
          </p>
        </div>
        <Badge
          label="Tax Year 2026-27"
          color={F.brand}
          bg={F.infoBg}
        />
      </div>

      {/* Navigation Tabs in Fiori Style */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${F.border}`,
          gap: 20,
        }}
      >
        {(
          [
            ["regime", "Tax Regime Selection"],
            ["declarations", "Investment Declarations"],
            ["deductions", "Statutory Deductions Summary"],
          ] as const
        ).map(([tabKey, label]) => {
          const active = activeTab === tabKey
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `3px solid ${active ? F.brand : "transparent"}`,
                padding: "10px 4px",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? F.brand : F.text2,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* TAB 1: Tax Regime Selection */}
      {activeTab === "regime" && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                Income Tax Regime Preference
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: F.text2 }}>
                Effective from 1 April 2026. Your selection applies for TDS withholding across FY 2026-27.
              </p>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: F.success,
                background: F.successBg,
                padding: "3px 10px",
                borderRadius: 12,
                height: 22,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Active: {regime === "new" ? "New Regime" : "Old Regime"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* New Tax Regime Option */}
            <div
              onClick={() => setRegime("new")}
              style={{
                border: `2px solid ${regime === "new" ? F.brand : F.border}`,
                borderRadius: 8,
                padding: "18px 20px",
                cursor: "pointer",
                background: regime === "new" ? F.infoBg : F.card,
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "new"}
                  onChange={() => setRegime("new")}
                  style={{ accentColor: F.brand }}
                />
                <strong style={{ fontSize: 15, color: F.text1 }}>
                  New Tax Regime (Sec 115BAC) &mdash; Recommended
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: 24, fontSize: 12, color: F.text2, lineHeight: 1.6 }}>
                <li>Lower slab rates with Standard Deduction of ₹75,000</li>
                <li>No requirement to submit 80C or HRA rent receipts</li>
                <li>Simplified compliance with zero documentation overhead</li>
              </ul>
            </div>

            {/* Old Tax Regime Option */}
            <div
              onClick={() => setRegime("old")}
              style={{
                border: `2px solid ${regime === "old" ? F.brand : F.border}`,
                borderRadius: 8,
                padding: "18px 20px",
                cursor: "pointer",
                background: regime === "old" ? F.infoBg : F.card,
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "old"}
                  onChange={() => setRegime("old")}
                  style={{ accentColor: F.brand }}
                />
                <strong style={{ fontSize: 15, color: F.text1 }}>
                  Old Tax Regime (Exemptions & Deductions)
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: 24, fontSize: 12, color: F.text2, lineHeight: 1.6 }}>
                <li>Claim exemptions for HRA, LTA, and Standard Deduction</li>
                <li>Deductions under Sec 80C (up to ₹1.5L), 80D, and Home Loan Interest</li>
                <li>Requires submission of rent receipts & investment proofs</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <Btn onClick={() => setConfirmModal(true)}>
              Save Tax Regime Selection
            </Btn>
          </div>
        </div>
      )}

      {/* TAB 2: Investment Declarations */}
      {activeTab === "declarations" && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${F.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: F.text1 }}>
                Section 80C & IT Deductions Declaration
              </h2>
              <div style={{ fontSize: 12, color: F.text2, marginTop: 2 }}>
                Submit investment proofs to reduce TDS tax liability under Old Regime
              </div>
            </div>
            <Btn small variant="secondary" onClick={() => toast("Declaration portal opened", "info")}>
              + Add New Declaration
            </Btn>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${F.border}`,
                  background: F.pageBg,
                  color: F.text2,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                <th style={{ padding: "10px 18px", textAlign: "left" }}>IT Section</th>
                <th style={{ padding: "10px 14px", textAlign: "left" }}>Investment Name</th>
                <th style={{ padding: "10px 14px", textAlign: "right" }}>Declared Amount</th>
                <th style={{ padding: "10px 18px", textAlign: "center" }}>Proof Verification</th>
              </tr>
            </thead>
            <tbody>
              {declarations.map((d) => (
                <tr key={d.name} style={{ borderBottom: `1px solid ${F.border}60` }}>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: F.brand }}>
                    {d.section}
                  </td>
                  <td style={{ padding: "14px 14px", color: F.text1 }}>{d.name}</td>
                  <td style={{ padding: "14px 14px", textAlign: "right", fontWeight: 700, color: F.text1 }}>
                    {d.declared}
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "center" }}>
                    <Badge
                      label={d.status}
                      color={d.status === "Verified" ? F.success : F.warning}
                      bg={d.status === "Verified" ? F.successBg : F.warningBg}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Statutory Deductions Summary */}
      {activeTab === "deductions" && (
        <div
          style={{
            background: F.card,
            border: `1px solid ${F.border}`,
            borderRadius: 8,
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: F.text1 }}>
            Latest Statutory Deductions Summary
          </h2>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: F.text2 }}>
            Withholding breakdown from your most recent completed payslip
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <div
              style={{
                background: F.pageBg,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "16px 18px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase" }}>
                Provident Fund (PF)
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: F.brand, marginTop: 4 }}>
                {inr(latest?.pf ?? 7200)}
              </div>
              <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                12% of Basic Salary
              </div>
            </div>

            <div
              style={{
                background: F.pageBg,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "16px 18px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase" }}>
                Income Tax (TDS)
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: F.warning, marginTop: 4 }}>
                {inr(latest?.tds ?? 11000)}
              </div>
              <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                Monthly TDS Withholding
              </div>
            </div>

            <div
              style={{
                background: F.pageBg,
                border: `1px solid ${F.border}`,
                borderRadius: 8,
                padding: "16px 18px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: F.text2, textTransform: "uppercase" }}>
                Professional Tax (PT)
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: F.text1, marginTop: 4 }}>
                {inr(latest?.profTax ?? 200)}
              </div>
              <div style={{ fontSize: 11, color: F.text3, marginTop: 2 }}>
                State Statutory Levy
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regime Confirmation Modal */}
      {confirmModal && (
        <Modal title="Confirm Tax Regime Selection" onClose={() => setConfirmModal(false)}>
          <p style={{ color: F.text2, fontSize: 13, lineHeight: 1.5 }}>
            You are selecting the{" "}
            <strong style={{ color: F.brand }}>
              {regime === "new" ? "New Tax Regime (Sec 115BAC)" : "Old Tax Regime"}
            </strong>{" "}
            for FY 2026-27. This selection will be used to calculate monthly TDS deductions on your payroll.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
            }}
          >
            <Btn variant="secondary" onClick={() => setConfirmModal(false)}>
              Cancel
            </Btn>
            <Btn
              onClick={() => {
                setConfirmModal(false)
                toast("Tax regime selection updated successfully", "success")
              }}
            >
              Confirm Selection
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}


function LoginPage({ onLogin }: { onLogin: (persona: Persona) => void }) {
  const [activeTab, setActiveTab] = useState<Persona>("org_admin")
  const [email, setEmail] = useState("meena.iyer@naxrita.com")
  const [password, setPassword] = useState("Password@2026")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [forgotModal, setForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSubmitted, setForgotSubmitted] = useState(false)
  const toast = useToast()

  const tabAccounts: Record<
    Persona,
    {
      label: string
      email: string
      role: string
    }
  > = {
    org_admin: {
      label: "Organisation Admin",
      email: "meena.iyer@naxrita.com",
      role: "Organization Administrator",
    },
    product_admin: {
      label: "Product Admin",
      email: "admin@naxpayroll.io",
      role: "Platform Administrator",
    },
    employee: {
      label: "Employee Login",
      email: "priya.nair@naxrita.in",
      role: "Employee Self-Service",
    },
  }

  const handleTabSelect = (tab: Persona) => {
    setActiveTab(tab)
    setEmail(tabAccounts[tab].email)
    setPassword("Password@2026")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast("Please enter your email or username", "warning")
      return
    }
    if (!password.trim()) {
      toast("Please enter your password", "warning")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin(activeTab)
    }, 300)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F6F7",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: F.text1,
        padding: "24px 16px",
      }}
    >
      {/* Enterprise Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#FFFFFF",
          border: `1px solid ${F.border}`,
          borderRadius: 8,
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
          padding: "36px 36px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              borderRadius: 8,
              background: "linear-gradient(135deg, #0070F2 0%, #0054A6 100%)",
              marginBottom: 12,
              boxShadow: "0 2px 8px rgba(0, 112, 242, 0.35)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <polyline points="10 8 13 11 16 8" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: F.text1,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Sign in to Naxpayroll
          </h1>
          <p style={{ fontSize: 13, color: F.text2, margin: "5px 0 0 0" }}>
            Select your portal to continue
          </p>
        </div>

        {/* 3 Tabs: Organisation Admin, Product Admin, Employee Login */}
        <div
          style={{
            display: "flex",
            background: "#F1F3F5",
            padding: 3,
            borderRadius: 6,
            marginBottom: 24,
            gap: 3,
          }}
        >
          {(
            [
              { id: "org_admin" as Persona, label: "Organisation Admin" },
              { id: "product_admin" as Persona, label: "Product Admin" },
              { id: "employee" as Persona, label: "Employee Login" },
            ]
          ).map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  background: active ? "#FFFFFF" : "transparent",
                  border: "none",
                  borderRadius: 5,
                  fontSize: 11.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? F.brand : F.text2,
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Clean Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Email / Username */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: F.text1,
                marginBottom: 6,
              }}
            >
              Email or Username
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${F.border}`,
                borderRadius: 5,
                background: "#FFFFFF",
                padding: "0 12px",
                height: 40,
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = F.brand)}
              onBlur={(e) => (e.currentTarget.style.borderColor = F.border)}
            >
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: F.text1,
                  background: "transparent",
                }}
              />
              {email && (
                <button
                  type="button"
                  onClick={() => setEmail("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: F.text3,
                    fontSize: 15,
                    padding: "0 2px",
                  }}
                  title="Clear"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: F.text1,
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email)
                  setForgotModal(true)
                  setForgotSubmitted(false)
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: F.brand,
                  fontWeight: 500,
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${F.border}`,
                borderRadius: 5,
                background: "#FFFFFF",
                padding: "0 12px",
                height: 40,
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = F.brand)}
              onBlur={(e) => (e.currentTarget.style.borderColor = F.border)}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: F.text1,
                  background: "transparent",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: F.text3,
                  padding: "0 2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              id="rememberMeCheckbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                cursor: "pointer",
                accentColor: F.brand,
                width: 15,
                height: 15,
              }}
            />
            <label
              htmlFor="rememberMeCheckbox"
              style={{
                fontSize: 12.5,
                color: F.text2,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Remember me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              height: 42,
              background: F.brand,
              color: "#FFFFFF",
              border: "none",
              borderRadius: 5,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 1px 3px rgba(0, 112, 242, 0.3)",
              transition: "background 0.15s ease",
              marginTop: 4,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.background = F.brandHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = F.brand
            }}
          >
            {isLoading ? (
              <span>Signing in...</span>
            ) : (
              <span>Sign In as {tabAccounts[activeTab].label}</span>
            )}
          </button>
        </form>

        {/* Subtle Pre-filled Notice */}
        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: `1px solid ${F.border}`,
            textAlign: "center",
            fontSize: 11.5,
            color: F.text3,
          }}
        >
          <span>Single Sign-On (SSO) active • Demo credentials pre-filled</span>
        </div>
      </div>

      {/* Subtle Footer */}
      <div
        style={{
          marginTop: 24,
          fontSize: 12,
          color: F.text3,
          textAlign: "center",
          display: "flex",
          gap: 16,
        }}
      >
        <span>© 2026 Naxpayroll Inc.</span>
        <span>•</span>
        <span style={{ cursor: "pointer", color: F.text2 }}>Privacy</span>
        <span>•</span>
        <span style={{ cursor: "pointer", color: F.text2 }}>Terms</span>
        <span>•</span>
        <span style={{ cursor: "pointer", color: F.text2 }}>Help</span>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <Modal title="Reset Password" onClose={() => setForgotModal(false)}>
          {forgotSubmitted ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: F.text1, margin: "0 0 8px" }}>
                Reset Instructions Sent
              </h3>
              <p style={{ fontSize: 13, color: F.text2, margin: 0, lineHeight: 1.5 }}>
                We've sent a password reset link to <strong style={{ color: F.brand }}>{forgotEmail}</strong>.
              </p>
              <div style={{ marginTop: 20 }}>
                <Btn onClick={() => setForgotModal(false)}>Back to Sign In</Btn>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 13, color: F.text2, margin: 0, lineHeight: 1.5 }}>
                Enter your work email address and we'll send you a link to reset your password.
              </p>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: F.text1, marginBottom: 5 }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{
                    width: "100%",
                    height: 38,
                    border: `1px solid ${F.border}`,
                    borderRadius: 4,
                    padding: "0 10px",
                    fontSize: 13,
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <Btn variant="secondary" onClick={() => setForgotModal(false)}>
                  Cancel
                </Btn>
                <Btn
                  onClick={() => {
                    if (!forgotEmail.trim()) {
                      toast("Please enter your email", "warning")
                      return
                    }
                    setForgotSubmitted(true)
                    toast("Reset link sent", "success")
                  }}
                >
                  Send Reset Link
                </Btn>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [persona, setPersona] = useState<Persona>("org_admin")
  const [view, setView] = useState("dashboard")
  const [emps, setEmps] = useState<Employee[]>(INIT_EMPS)
  const [ss, setSS] = useState<SalaryStructure[]>(INIT_SS)
  const [payruns, setPayruns] = useState<Payrun[]>(INIT_PAYRUNS)
  const [orgs, setOrgs] = useState<Organization[]>(INIT_ORGS)
  const [auditLogs] = useState<AuditLog[]>(INIT_AUDIT)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const showToast = useCallback((msg: string, type: ToastType = "info") => {
    const id = Date.now()
    setToasts((t) => [...t, { id, msg, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const myEmp = emps.find((e) => e.id === MY_EMP_ID)!
  const nav =
    persona === "product_admin"
      ? PROD_NAV
      : persona === "employee"
        ? EMP_NAV
        : ORG_NAV
  const personaUser: Record<Persona, string> = {
    org_admin: "Meena Iyer",
    product_admin: "Platform Admin",
    employee: myEmp.name,
  }
  const personaRole: Record<Persona, string> = {
    org_admin: "Organization Admin",
    product_admin: "Product Admin",
    employee: myEmp.designation,
  }
  const personaInit: Record<Persona, string> = {
    org_admin: "MI",
    product_admin: "PA",
    employee: "PN",
  }
  const switchPersona = (p: Persona) => {
    setPersona(p)
    setView("dashboard")
  }
  const curPayrunStatus = payruns.find((p) => p.period === "August 2026")
    ?.status

  if (!isLoggedIn) {
    return (
      <ToastCtx.Provider value={showToast}>
        <LoginPage
          onLogin={(p) => {
            setPersona(p)
            setView("dashboard")
            setIsLoggedIn(true)
            showToast(`Welcome back, ${personaUser[p]}! Logged in as ${personaRole[p]}`, "success")
          }}
        />
        <Toasts toasts={toasts} />
      </ToastCtx.Provider>
    )
  }

  return (
    <ToastCtx.Provider value={showToast}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: F.pageBg,
          fontFamily: "'Inter',Arial,sans-serif",
          color: F.text1,
        }}
      >
        <header
          style={{
            height: 48,
            background: F.shell,
            display: "flex",
            alignItems: "center",
            paddingInline: 16,
            gap: 10,
            flexShrink: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            zIndex: 100,
          }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.65)",
              cursor: "pointer",
              padding: 6,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4.5,
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: "currentColor",
                borderRadius: 1,
                display: "block",
              }}
            />
            <span
              style={{
                width: 14,
                height: 2,
                background: "currentColor",
                borderRadius: 1,
                display: "block",
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: "currentColor",
                borderRadius: 1,
                display: "block",
              }}
            />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: F.brand,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "-0.5px",
              }}
            >
              Nx
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Naxpayroll
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Payroll Platform
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <LiveClock />
          <NotificationBell showToast={showToast} />
          <ProfileMenu
            persona={persona}
            onProfile={() => setView("profile")}
            personaUser={personaUser}
            personaRole={personaRole}
            personaInit={personaInit}
            showToast={showToast}
            onSignOut={() => {
              setIsLoggedIn(false)
            }}
          />
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <nav
            style={{
              width: sidebarOpen ? 220 : 56,
              background: F.shell,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              overflowY: "auto",
              overflowX: "hidden",
              paddingTop: 8,
              paddingBottom: 16,
              transition: "width 0.2s ease",
            }}
          >
            {nav.map((item) => {
              const active = view === item.id
              return (
                <div
                  key={item.id}
                  title={!sidebarOpen ? item.label : undefined}
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => setView(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: sidebarOpen ? "10px 14px" : "12px",
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                      background: active
                        ? "rgba(255,255,255,0.18)"
                        : "transparent",
                      border: "none",
                      borderLeft: `3px solid ${
                        active ? F.brand : "transparent"
                      }`,
                      cursor: "pointer",
                      color: active ? "#fff" : "rgba(255,255,255,0.6)",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      width: "100%",
                      fontFamily: "inherit",
                      transition: "all 0.12s",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.10)"
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        opacity: active ? 1 : 0.65,
                      }}
                    >
                      <NavIcon id={item.id} />
                    </span>
                    {sidebarOpen && (
                      <span
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                </div>
              )
            })}
            <div style={{ flex: 1 }} />
            {sidebarOpen && persona === "org_admin" && curPayrunStatus && (
              <div
                style={{
                  margin: "0 10px 10px",
                  padding: 10,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  Current Period
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                  August 2026
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 2,
                  }}
                >
                  Pay run: {curPayrunStatus}
                </div>
                <div
                  style={{
                    marginTop: 7,
                    height: 3,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.15)",
                  }}
                >
                  <div
                    style={{
                      width: `${(PAYRUN_STEPS.indexOf(curPayrunStatus) / 4) * 100}%`,
                      height: "100%",
                      borderRadius: 2,
                      background: F.warning,
                    }}
                  />
                </div>
                <button
                  onClick={() => setView("payruns")}
                  style={{
                    marginTop: 8,
                    width: "100%",
                    padding: "5px 0",
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    borderRadius: 3,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Go to Pay Runs
                </button>
              </div>
            )}
          </nav>

          <main style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>
            {persona === "org_admin" && (
              <>
                {view === "dashboard" && (
                  <DashboardView
                    emps={emps}
                    payruns={payruns}
                    ss={ss}
                    onNav={setView}
                  />
                )}
                {view === "employees" && (
                  <EmployeesView emps={emps} setEmps={setEmps} ss={ss} />
                )}
                {view === "salary" && (
                  <SalaryManagementView emps={emps} ss={ss} setSS={setSS} />
                )}
                {view === "payruns" && (
                  <PayRunsView
                    emps={emps}
                    ss={ss}
                    payruns={payruns}
                    setPayruns={setPayruns}
                  />
                )}
                {view === "payslips" && (
                  <PayslipsView emps={emps} payruns={payruns} />
                )}
                {view === "reports" && (
                  <ReportsView emps={emps} ss={ss} payruns={payruns} />
                )}
                {view === "access" && <AccessManagementView emps={emps} />}
                {view === "audit" && <AuditHistoryView logs={auditLogs} />}
              </>
            )}
            {persona === "product_admin" && (
              <>
                {view === "dashboard" && (
                  <PlatformDashboard
                    orgs={orgs}
                    logs={auditLogs}
                    onNav={setView}
                  />
                )}
                {view === "orgs" && (
                  <OrganizationsView orgs={orgs} setOrgs={setOrgs} />
                )}
                {view === "access" && (
                  <PlatformAccessManagementView orgs={orgs} />
                )}
                {view === "audit" && (
                  <AuditHistoryView
                    logs={auditLogs.filter(
                      (a) =>
                        ["Platform", "Access", "Organizations"].includes(
                          a.module,
                        ) ||
                        a.action.includes("Org") ||
                        a.action.includes("Access"),
                    )}
                  />
                )}
              </>
            )}
            {persona === "employee" && (
              <>
                {view === "dashboard" && (
                  <EmployeeDashboardView
                    emp={myEmp}
                    payruns={payruns}
                    structures={ss}
                    onNav={setView}
                  />
                )}
                {view === "profile" && <MyProfileView emp={myEmp} />}
                {view === "salary" && (
                  <MySalaryView emp={myEmp} structures={ss} onNav={setView} />
                )}
                {view === "payruns" && (
                  <PayrollHistoryView emp={myEmp} payruns={payruns} onNav={setView} />
                )}
                {view === "payslips" && (
                  <EmployeePayslipsView emp={myEmp} payruns={payruns} />
                )}
                {view === "documents" && <DocumentsView />}
                {view === "financial" && (
                  <FinancialDataView emp={myEmp} payruns={payruns} />
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <Toasts toasts={toasts} />
    </ToastCtx.Provider>
  )
}
