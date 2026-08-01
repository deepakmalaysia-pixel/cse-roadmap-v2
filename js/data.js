const FOUNDATION = [
  {id:'prog', title:'Programming Logic', color:'#22D3EE', points:[
    {id:'c_lang', label:'C Language', desc:'Pointers, memory, file handling'},
    {id:'python_basic', label:'Python Basics', desc:'Scripting, automation'},
    {id:'git', label:'Git & GitHub', desc:'Commit, PR, README habit'},
    {id:'ps100', label:'100 Pattern Problems', desc:'Not 500 random - patterns'},
    {id:'linux_cli', label:'Linux & CLI', desc:'Terminal-first'}
  ]},
  {id:'core', title:'CS Core - 5 Pillars', color:'#A78BFA', points:[
    {id:'dsa', label:'DSA', desc:'Array, Hash, Tree, Graph, DP'},
    {id:'sql', label:'DBMS / SQL', desc:'JOINs, Index, ACID, Window Func'},
    {id:'os', label:'Operating Systems', desc:'Process, Thread, Deadlock'},
    {id:'cn', label:'Computer Networks', desc:'TCP/IP, HTTP, DNS'},
    {id:'oop', label:'OOP + System Design Basics', desc:'SOLID, APIs'}
  ]},
  {id:'math', title:'Math & Logic', color:'#34D399', points:[
    {id:'discrete', label:'Discrete Maths', desc:'Sets, logic, graphs'},
    {id:'stats', label:'Stats & Prob', desc:'For Data/AI'},
    {id:'aptitude', label:'Aptitude 30m daily', desc:'Quant, logical, verbal'},
    {id:'bigo', label:'Big-O Analysis', desc:'Complexity habit'}
  ]},
  {id:'habit', title:'Engineering Habits', color:'#FBBF24', points:[
    {id:'docs', label:'Docs & Communication', desc:'Good README, emails'},
    {id:'proj1', label:'Project 1 - CRUD', desc:'Inventory/Expense system'},
    {id:'proj2', label:'Project 2 - Core CS', desc:'Shell, DB, or Compiler'},
    {id:'oss', label:'Open Source / Build Log', desc:'LinkedIn weekly log'}
  ]}
];

const CAREERS = [
  {id:'fullstack', title:'Full Stack / Product', cat:'saas', demand:'High', fresher:'6-12 LPA', mid:'9-15 LPA', note:'SaaS/Product', skills:['Sem5: JS/TS, React','Sem6: Node or Java/Spring','Sem7: Auth, DB, APIs','Sem8: System Design'], projects:['SaaS Dashboard RBAC + Payments','Realtime Collab App'], certs:'Meta Front-end, AWS Practitioner', targets:'Zoho, Razorpay, Freshworks', tasks:['react_basics','node_api','auth_jwt','deploy_vercel']},
  {id:'cloud', title:'Cloud & DevOps', cat:'corporate', demand:'Very High', fresher:'5-9 LPA', mid:'15-25 LPA', note:'8x gap', skills:['Sem5: Linux, NW, Bash','Sem6: Docker, GH Actions','Sem7: AWS, K8s, Terraform','Sem8: Observability'], projects:['CI/CD MERN on EKS','Infra as Code 3-tier'], certs:'AWS SAA', targets:'Banks, LTIMindtree', tasks:['docker','aws_ec2_s3','k8s_basics','cicd']},
  {id:'data', title:'Data & AI Engineer', cat:'saas', demand:'High', fresher:'6-10 LPA', mid:'10-18 LPA', note:'RAG wave', skills:['Sem5: Python, SQL, Pandas','Sem6: ML, Vector DB','Sem7: RAG, FastAPI','Sem8: MLOps'], projects:['RAG Chatbot','Sales Forecast'], certs:'AWS Data', targets:'Fractal, MuSigma', tasks:['pandas','rag','vector_db','etl']},
  {id:'cyber', title:'Cybersecurity', cat:'corporate', demand:'Critical', fresher:'5-8 LPA', mid:'12-20 LPA', note:'Fintech push', skills:['Sem5: Networks, Hardening','Sem6: OWASP, Burp','Sem7: SOC, SIEM','Sem8: Cloud Sec'], projects:['Vuln Scanner','Zero Trust Lab'], certs:'CEH, Security+', targets:'Bank SOC, Wipro Cyber', tasks:['owasp','burp','siem','cloud_sec']},
  {id:'enterprise', title:'Enterprise IT / Digitization', cat:'corporate', demand:'Massive', fresher:'3.5-6 LPA', mid:'12-18 LPA', note:'Mass volume India', skills:['Sem5: Adv SQL Admin','Sem6: Power BI, Excel Auto','Sem7: ERP/CRM API','Sem8: Automation'], projects:['Digitize paper process','Automated Reports'], certs:'Azure Fund, Power BI', targets:'TCS, Infosys, Manufacturing IT', tasks:['adv_sql','powerbi','erp_api','automation']},
  {id:'qa', title:'QA / SDET', cat:'fast', demand:'High Entry', fresher:'3-5 LPA', mid:'8-12 LPA', note:'Fastest entry', skills:['Testing Fund','Selenium/Playwright','API Testing','Perf Testing'], projects:['Automation Suite','Load Test Dashboard'], certs:'ISTQB', targets:'All service cos', tasks:['manual_test','selenium','api_test','perf_test']}
];
