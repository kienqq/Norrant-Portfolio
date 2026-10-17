export interface InterviewQuestion {
  id: string;
  role: string;
  level: "Fresher" | "Junior" | "Senior";
  type: "theory" | "application" | "adaptation";
  topic: string;
  question: { en: string; vi: string };
  businessContext: { en: string; vi: string };
  dataAvailable: { en: string; vi: string };
  expectedAnswer: { en: string; vi: string };
  technicalPattern: { en: string; vi: string };
  sqlCode?: string;
  followUps: { en: string; vi: string }[];
  weakSignals: { en: string; vi: string }[];
}

export const ROLES = [
  "SC Data Analyst",
  "SC Business Analyst",
  "BI Analyst (SC)",
  "Demand Planner",
  "Inventory Analyst",
  "SC Planning Analyst",
  "Logistics Analyst",
  "Procurement Analyst",
  "SC Data Engineer",
  "SC Systems/ERP BA",
] as const;

export const LEVELS = ["Fresher", "Junior", "Senior"] as const;
export const TYPES = ["theory", "application", "adaptation"] as const;

export const TOPICS = [
  "SQL",
  "Data Modeling",
  "Statistics",
  "Visualization",
  "Inventory Management",
  "Demand Forecasting",
  "Supply Chain Planning",
  "Logistics Optimization",
  "Procurement",
  "Data Pipeline",
  "ERP Systems",
  "Business Analysis",
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "scda-001",
    role: "SC Data Analyst",
    level: "Fresher",
    type: "theory",
    topic: "SQL",
    question: {
      en: "Explain the difference between INNER JOIN and LEFT JOIN. When would you use each in a supply chain context?",
      vi: "Giải thích sự khác biệt giữa INNER JOIN và LEFT JOIN. Khi nào bạn dùng mỗi loại trong bối cảnh chuỗi cung ứng?",
    },
    businessContext: {
      en: "At a retailer like Walmart, you often need to join purchase orders with shipments to find orders that haven't shipped yet.",
      vi: "Tại một nhà bán lẻ như Walmart, bạn thường cần join đơn mua hàng với lô hàng để tìm đơn chưa được giao.",
    },
    dataAvailable: {
      en: "purchase_orders (po_id, vendor_id, order_date, total_qty) and shipments (shipment_id, po_id, ship_date, qty_shipped).",
      vi: "purchase_orders (po_id, vendor_id, order_date, total_qty) và shipments (shipment_id, po_id, ship_date, qty_shipped).",
    },
    expectedAnswer: {
      en: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table and matching rows from the right, with NULLs where no match exists. Use LEFT JOIN when you need all purchase orders including those not yet shipped.",
      vi: "INNER JOIN chỉ trả về các dòng khớp ở cả hai bảng. LEFT JOIN trả về tất cả dòng từ bảng trái và dòng khớp từ bảng phải, với NULL nếu không có match. Dùng LEFT JOIN khi cần tất cả đơn mua hàng kể cả chưa giao.",
    },
    technicalPattern: {
      en: "Use LEFT JOIN with a WHERE IS NULL filter to find records in one table that have no match in another — a classic 'orphan record' pattern.",
      vi: "Dùng LEFT JOIN với WHERE IS NULL để tìm bản ghi ở một bảng không có match ở bảng kia — pattern 'bản ghi mồ côi' kinh điển.",
    },
    sqlCode: `SELECT po.*
FROM purchase_orders po
LEFT JOIN shipments s ON po.po_id = s.po_id
WHERE s.po_id IS NULL;`,
    followUps: [
      {
        en: "What if there are multiple shipments per PO? How would the query change?",
        vi: "Nếu một PO có nhiều shipment thì sao? Query thay đổi thế nào?",
      },
      {
        en: "How do you handle duplicates caused by the join?",
        vi: "Bạn xử lý duplicate do join gây ra thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot distinguish INNER vs LEFT JOIN semantics",
        vi: "Không phân biệt được ý nghĩa INNER vs LEFT JOIN",
      },
      {
        en: "No mention of NULL handling in LEFT JOIN",
        vi: "Không đề cập đến xử lý NULL trong LEFT JOIN",
      },
      {
        en: "Unable to write the actual SQL syntax",
        vi: "Không viết được cú pháp SQL thực tế",
      },
    ],
  },
  {
    id: "scda-002",
    role: "SC Data Analyst",
    level: "Junior",
    type: "application",
    topic: "Statistics",
    question: {
      en: "You're analyzing delivery times for a logistics provider. The mean delivery time is 5 days but the median is 3 days. What does this tell you, and how would you investigate further?",
      vi: "Bạn đang phân tích thời gian giao hàng. Mean là 5 ngày nhưng median là 3 ngày. Điều này cho bạn biết gì và bạn sẽ điều tra thêm thế nào?",
    },
    businessContext: {
      en: "At FedEx or DHL, understanding delivery time distribution helps set customer expectations and identify service failures.",
      vi: "Tại FedEx hay DHL, hiểu phân phối thời gian giao hàng giúp đặt kỳ vọng khách hàng và xác định lỗi dịch vụ.",
    },
    dataAvailable: {
      en: "Delivery log with 10,000 records: shipment_id, order_date, delivery_date, calculated_delivery_time_days.",
      vi: "Nhật ký giao hàng 10.000 bản ghi: shipment_id, order_date, delivery_date, calculated_delivery_time_days.",
    },
    expectedAnswer: {
      en: "The distribution is right-skewed — some shipments take much longer (outliers). I'd examine the distribution with a histogram, calculate percentiles (P90, P99), segment by route/region, and investigate the tail end for root causes.",
      vi: "Phân phối lệch phải — một số lô hàng mất nhiều thời gian hơn (outliers). Tôi sẽ vẽ histogram, tính percentiles (P90, P99), phân khúc theo tuyến/khu vực, và điều tra các giá trị đuôi để tìm nguyên nhân gốc.",
    },
    technicalPattern: {
      en: "Always compare mean vs median to detect skew. Use percentile analysis (NTILE or PERCENTILE_CONT in SQL) to quantify the tail.",
      vi: "Luôn so sánh mean vs median để phát hiện skew. Dùng phân tích percentile (NTILE hoặc PERCENTILE_CONT trong SQL) để định lượng phần đuôi.",
    },
    sqlCode: `SELECT
  AVG(delivery_time_days) AS mean_time,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY delivery_time_days) AS median_time,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY delivery_time_days) AS p90_time,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY delivery_time_days) AS p99_time,
  MAX(delivery_time_days) AS max_time
FROM delivery_log;`,
    followUps: [
      {
        en: "What metrics would you use to monitor delivery performance over time?",
        vi: "Bạn sẽ dùng metric nào để theo dõi hiệu suất giao hàng theo thời gian?",
      },
      {
        en: "How would you present this to a non-technical operations manager?",
        vi: "Bạn trình bày điều này với quản lý vận hành không chuyên kỹ thuật thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Confuses mean and median or thinks they should always match",
        vi: "Nhầm lẫn mean và median hoặc nghĩ chúng luôn bằng nhau",
      },
      {
        en: "Cannot explain what right-skewed means practically",
        vi: "Không giải thích được right-skewed nghĩa là gì trong thực tế",
      },
      {
        en: "Jumps to complex models without basic exploratory analysis",
        vi: "Nhảy vào mô hình phức tạp mà không qua phân tích khám phá cơ bản",
      },
    ],
  },
  {
    id: "scda-003",
    role: "SC Data Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Data Modeling",
    question: {
      en: "Design a data model to track inventory across multiple warehouses with real-time stock movements, reservations, and historical snapshots. What fact and dimension tables would you create?",
      vi: "Thiết kế data model để theo dõi tồn kho qua nhiều kho với stock movements real-time, reservations, và snapshot lịch sử. Bạn sẽ tạo fact và dimension tables nào?",
    },
    businessContext: {
      en: "At Flexport or Maersk, inventory accuracy across distributed warehouses is critical for client operations and billing.",
      vi: "Tại Flexport hay Maersk, độ chính xác tồn kho qua các kho phân tán là rất quan trọng cho vận hành và billing của khách hàng.",
    },
    dataAvailable: {
      en: "Warehouse list, product catalog, inbound/outbound transactions, cycle count logs, reservation records across 50+ locations.",
      vi: "Danh sách kho, danh mục sản phẩm, giao dịch nhập/xuất, nhật ký kiểm kê, reservation records qua 50+ địa điểm.",
    },
    expectedAnswer: {
      en: "I'd design a star schema: fact_inventory_snapshot (daily), fact_stock_movement (transactional), dim_product, dim_warehouse, dim_date, dim_status. For real-time: use an inventory_ledger with running balance. Include slowly changing dimensions for product attributes.",
      vi: "Tôi sẽ thiết kế star schema: fact_inventory_snapshot (hàng ngày), fact_stock_movement (transactional), dim_product, dim_warehouse, dim_date, dim_status. Cho real-time: dùng inventory_ledger với running balance. Bao gồm SCD cho thuộc tính sản phẩm.",
    },
    technicalPattern: {
      en: "Use a ledger-style fact table (event sourcing pattern) for real-time balance: each row is an event, current balance = SUM of all events. Periodic snapshots for historical queries. Partition by warehouse + date.",
      vi: "Dùng fact table kiểu ledger (event sourcing pattern) cho số dư real-time: mỗi dòng là một sự kiện, số dư hiện tại = SUM của tất cả sự kiện. Snapshot định kỳ cho truy vấn lịch sử. Partition theo warehouse + date.",
    },
    followUps: [
      {
        en: "How would you handle data reconciliation when the ledger gets out of sync with physical stock?",
        vi: "Bạn xử lý đối chiếu dữ liệu khi ledger lệch với stock thực tế thế nào?",
      },
      {
        en: "How do you handle late-arriving events in the ledger?",
        vi: "Bạn xử lý sự kiện đến muộn trong ledger thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot distinguish between fact and dimension tables",
        vi: "Không phân biệt được fact và dimension tables",
      },
      {
        en: "Misses the need for periodic snapshots alongside real-time events",
        vi: "Bỏ qua nhu cầu snapshot định kỳ cạnh sự kiện real-time",
      },
      {
        en: "Doesn't consider SCD for changing product/warehouse attributes",
        vi: "Không xét SCD cho thuộc tính sản phẩm/kho thay đổi",
      },
    ],
  },
  {
    id: "scba-001",
    role: "SC Business Analyst",
    level: "Fresher",
    type: "theory",
    topic: "Business Analysis",
    question: {
      en: "Walk me through how you would gather requirements for a new inventory reporting dashboard requested by the operations team.",
      vi: "Hãy mô tả cách bạn thu thập yêu cầu cho một dashboard báo cáo tồn kho mới được đội vận hành yêu cầu.",
    },
    businessContext: {
      en: "At SharkNinja or Elmich, the ops team needs visibility into slow-moving inventory to decide on markdowns and promotions.",
      vi: "Tại SharkNinja hay Elmich, đội vận hành cần thấy hàng tồn chậm để quyết định giảm giá và khuyến mãi.",
    },
    dataAvailable: {
      en: "Current inventory levels, sales data by SKU, warehouse locations, product lifecycle stages, promo calendar.",
      vi: "Mức tồn kho hiện tại, dữ liệu bán hàng theo SKU, vị trí kho, vòng đời sản phẩm, lịch khuyến mãi.",
    },
    expectedAnswer: {
      en: "I'd start with stakeholder interviews to understand their decisions and KPIs. Then review existing reports, identify gaps, define user stories, prioritize via MoSCoW, document acceptance criteria, and validate with a mockup before building.",
      vi: "Tôi sẽ bắt đầu bằng phỏng vấn stakeholder để hiểu quyết định và KPI của họ. Sau đó xem xét báo cáo hiện tại, xác định gaps, định nghĩa user stories, ưu tiên theo MoSCoW, ghi tiêu chí chấp nhận, và validate bằng mockup trước khi build.",
    },
    technicalPattern: {
      en: "Use a structured requirements framework: user story mapping → acceptance criteria (Given/When/Then) → data dictionary → mockup validation → backlog refinement.",
      vi: "Dùng framework yêu cầu có cấu trúc: user story mapping → acceptance criteria (Given/When/Then) → data dictionary → mockup validation → backlog refinement.",
    },
    followUps: [
      {
        en: "What do you do when the ops team asks for something technically infeasible?",
        vi: "Bạn làm gì khi đội vận hành yêu cầu điều không khả thi về kỹ thuật?",
      },
      {
        en: "How do you prioritize conflicting requirements from different stakeholders?",
        vi: "Bạn ưu tiên yêu cầu xung đột từ các stakeholder khác nhau thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Starts with solution design before understanding the problem",
        vi: "Bắt đầu bằng thiết kế giải pháp trước khi hiểu vấn đề",
      },
      {
        en: "No structured methodology mentioned",
        vi: "Không đề cập phương pháp luận có cấu trúc",
      },
      {
        en: "Ignores stakeholder validation step",
        vi: "Bỏ qua bước xác nhận với stakeholder",
      },
    ],
  },
  {
    id: "scba-002",
    role: "SC Business Analyst",
    level: "Junior",
    type: "application",
    topic: "Visualization",
    question: {
      en: "You need to build a Power BI/Tableau dashboard to show supply chain performance to the VP of Operations. What KPIs would you include and how would you visualize them?",
      vi: "Bạn cần xây dashboard Power BI/Tableau để trình bày hiệu suất chuỗi cung ứng cho VP Operations. Bạn sẽ bao gồm KPI nào và visualize thế nào?",
    },
    businessContext: {
      en: "At DHL or Crossian, executives need a high-level view of OTIF (On-Time In-Full), cost per order, and inventory turns across regions.",
      vi: "Tại DHL hay Crossian, lãnh đạo cần cái nhìn tổng quan về OTIF, chi phí mỗi đơn hàng, và vòng quay tồn kho theo vùng.",
    },
    dataAvailable: {
      en: "Order fulfillment data (order_date, ship_date, delivery_date, qty_ordered, qty_delivered), freight costs, inventory levels by region.",
      vi: "Dữ liệu thực hiện đơn hàng (ngày đặt, ngày gửi, ngày giao, số lượng đặt/giao), chi phí vận chuyển, tồn kho theo vùng.",
    },
    expectedAnswer: {
      en: "KPI cards: OTIF %, Cost per Order, Inventory Turns. Trend lines for each KPI over time. Bar charts comparing regions. Scatter plot for delivery time vs cost. Color indicators: green/amber/red against targets. Drill-down from region to warehouse level.",
      vi: "Thẻ KPI: OTIF %, Chi phí/Đơn hàng, Vòng quay tồn kho. Đường xu hướng theo thời gian. Biểu đồ cột so sánh vùng. Scatter plot thời gian giao vs chi phí. Chỉ thị màu xanh/vàng/đỏ so với mục tiêu. Drill-down từ vùng đến từng kho.",
    },
    technicalPattern: {
      en: "Executive dashboards follow the '3-second rule': key insights must be visible within 3 seconds. Top row = 3-5 KPI cards, middle = trends, bottom = breakdowns. Limited interactivity — pre-filtered, scrolled, not clicked.",
      vi: "Dashboard cho lãnh đạo theo '3-second rule': insight chính phải thấy trong 3 giây. Hàng trên = 3-5 thẻ KPI, giữa = xu hướng, dưới = phân tích chi tiết. Tương tác hạn chế — lọc sẵn, cuộn, không cần click.",
    },
    followUps: [
      {
        en: "How do you decide what KPI is most important if the VP asks for only one metric?",
        vi: "Bạn quyết định KPI nào quan trọng nhất nếu VP chỉ muốn một metric?",
      },
      {
        en: "How would you handle data latency in a real-time dashboard?",
        vi: "Bạn xử lý độ trễ dữ liệu trong dashboard real-time thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Adds too many KPIs without prioritization",
        vi: "Thêm quá nhiều KPI không ưu tiên",
      },
      {
        en: "Doesn't consider the audience level (executive vs analyst)",
        vi: "Không xét đối tượng xem (lãnh đạo vs analyst)",
      },
      {
        en: "Describes charts without linking to business decisions",
        vi: "Mô tả biểu đồ không gắn với quyết định kinh doanh",
      },
    ],
  },
  {
    id: "scba-003",
    role: "SC Business Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Business Analysis",
    question: {
      en: "Your company is implementing a new WMS (Warehouse Management System). The operations team wants to keep the old process, but IT says the new system requires process changes. How do you handle this?",
      vi: "Công ty bạn đang triển khai WMS mới. Đội vận hành muốn giữ quy trình cũ, nhưng IT nói hệ thống mới yêu cầu thay đổi quy trình. Bạn xử lý thế nào?",
    },
    businessContext: {
      en: "At VN Post or CyberLogitec, WMS migrations are common and stakeholder resistance is a major risk factor.",
      vi: "Tại VN Post hay CyberLogitec, chuyển đổi WMS thường xuyên và kháng cự từ stakeholder là rủi ro lớn.",
    },
    dataAvailable: {
      en: "Current SOPs, WMS vendor documentation, process flow diagrams, user feedback from pilot, training records.",
      vi: "SOP hiện tại, tài liệu WMS vendor, sơ đồ luồng quy trình, phản hồi người dùng từ pilot, hồ sơ đào tạo.",
    },
    expectedAnswer: {
      en: "I'd conduct a gap analysis between old and new processes, quantify the cost/benefit of process change, run a pilot with willing users, document success metrics, create a change management plan with training and transition support, and present a data-backed case to both sides.",
      vi: "Tôi sẽ phân tích gap giữa quy trình cũ và mới, lượng hóa chi phí/lợi ích của thay đổi, chạy pilot với người dùng sẵn sàng, ghi lại metric thành công, tạo kế hoạch quản lý thay đổi với đào tạo và hỗ trợ chuyển đổi, và trình bày case có dữ liệu cho cả hai bên.",
    },
    technicalPattern: {
      en: "Change management framework: ADKAR model (Awareness → Desire → Knowledge → Ability → Reinforcement). Document as-is and to-be process flows, identify pain points, measure adoption metrics post-go-live.",
      vi: "Khung quản lý thay đổi: mô hình ADKAR (Nhận thức → Mong muốn → Kiến thức → Khả năng → Củng cố). Ghi lại quy trình hiện tại và tương lai, xác định điểm đau, đo lường metric áp dụng sau go-live.",
    },
    followUps: [
      {
        en: "What if the pilot fails? How do you recover?",
        vi: "Nếu pilot thất bại thì sao? Bạn khắc phục thế nào?",
      },
      {
        en: "How do you measure the success of a WMS migration beyond go-live?",
        vi: "Bạn đo thành công của WMS migration thế nào ngoài go-live?",
      },
    ],
    weakSignals: [
      {
        en: "Takes IT's side without understanding operations perspective",
        vi: "Đứng về phía IT mà không hiểu góc nhìn vận hành",
      },
      {
        en: "No structured change management approach",
        vi: "Không có phương pháp quản lý thay đổi có cấu trúc",
      },
      {
        en: "Cannot quantify business impact of process change",
        vi: "Không lượng hóa được tác động kinh doanh của thay đổi quy trình",
      },
    ],
  },
  {
    id: "bia-001",
    role: "BI Analyst (SC)",
    level: "Fresher",
    type: "theory",
    topic: "SQL",
    question: {
      en: "What is a window function? Give an example of how you would use ROW_NUMBER() in a supply chain report.",
      vi: "Window function là gì? Cho ví dụ dùng ROW_NUMBER() trong báo cáo chuỗi cung ứng.",
    },
    businessContext: {
      en: "At Flipkart, you need to identify the latest status of each order from a log table with multiple status updates per order.",
      vi: "Tại Flipkart, bạn cần xác định trạng thái mới nhất của mỗi đơn hàng từ bảng log có nhiều cập nhật trạng thái.",
    },
    dataAvailable: {
      en: "order_status_log (log_id, order_id, status, changed_at) with multiple rows per order.",
      vi: "order_status_log (log_id, order_id, status, changed_at) với nhiều dòng mỗi đơn hàng.",
    },
    expectedAnswer: {
      en: "A window function performs a calculation across a set of rows related to the current row without collapsing them. ROW_NUMBER() assigns a unique sequential number within a partition. I'd use ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY changed_at DESC) to get the latest status per order.",
      vi: "Window function tính toán trên một tập dòng liên quan đến dòng hiện tại mà không gộp chúng. ROW_NUMBER() gán số thứ tự duy nhất trong partition. Tôi dùng ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY changed_at DESC) để lấy trạng thái mới nhất mỗi đơn.",
    },
    technicalPattern: {
      en: "Use ROW_NUMBER() with PARTITION BY the entity key and ORDER BY timestamp DESC, then filter WHERE row_num = 1 in a subquery or CTE. This is the 'latest record per group' pattern.",
      vi: "Dùng ROW_NUMBER() với PARTITION BY khóa thực thể và ORDER BY timestamp DESC, sau đó lọc WHERE row_num = 1 trong subquery hoặc CTE. Đây là pattern 'bản ghi mới nhất mỗi nhóm'.",
    },
    sqlCode: `WITH latest_status AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY changed_at DESC) AS rn
  FROM order_status_log
)
SELECT order_id, status, changed_at
FROM latest_status
WHERE rn = 1;`,
    followUps: [
      {
        en: "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
        vi: "Khác nhau giữa ROW_NUMBER(), RANK(), và DENSE_RANK() là gì?",
      },
      {
        en: "How would you handle ties in the ORDER BY clause?",
        vi: "Bạn xử lý ties trong ORDER BY thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot explain what makes window functions different from GROUP BY",
        vi: "Không giải thích được window function khác GROUP BY thế nào",
      },
      {
        en: "Forgets PARTITION BY clause",
        vi: "Quên mệnh đề PARTITION BY",
      },
      {
        en: "Confuses ROW_NUMBER with RANK",
        vi: "Nhầm ROW_NUMBER với RANK",
      },
    ],
  },
  {
    id: "bia-002",
    role: "BI Analyst (SC)",
    level: "Junior",
    type: "application",
    topic: "Visualization",
    question: {
      en: "You built a weekly OTIF dashboard. On Monday, the data shows 92% OTIF, but the warehouse manager insists they shipped everything correctly. How do you investigate?",
      vi: "Bạn xây dashboard OTIF hàng tuần. Thứ Hai, dữ liệu cho thấy OTIF 92%, nhưng quản lý kho khẳng định họ giao đúng. Bạn điều tra thế nào?",
    },
    businessContext: {
      en: "At Walmart or DHL, OTIF disputes between data and operations are common and erode trust in reporting.",
      vi: "Tại Walmart hay DHL, tranh chấp OTIF giữa dữ liệu và vận hành thường xuyên và làm mất niềm tin vào báo cáo.",
    },
    dataAvailable: {
      en: "OTIF dashboard: 92% OTIF. Raw order data, shipment records, delivery confirmation timestamps, customer return logs.",
      vi: "Dashboard OTIF: 92% OTIF. Dữ liệu đơn hàng gốc, hồ sơ lô hàng, dấu thời gian xác nhận giao hàng, nhật ký trả hàng.",
    },
    expectedAnswer: {
      en: "I'd drill into the 8% that failed OTIF. Check: (1) data pipeline timing — are we missing late-arriving confirmations? (2) measurement definition — does OTIF count customer-requested delivery windows or our committed windows? (3) data quality — are there missing timestamps? (4) compare with physical proof of delivery logs.",
      vi: "Tôi sẽ drill vào 8% thất bại OTIF. Kiểm tra: (1) thời gian pipeline — có thiếu xác nhận đến muộn? (2) định nghĩa đo lường — OTIF tính theo cửa sổ khách hàng yêu cầu hay cửa sổ cam kết? (3) chất lượng dữ liệu — có thiếu timestamp? (4) so sánh với log xác nhận giao hàng thực tế.",
    },
    technicalPattern: {
      en: "Always validate data quality before escalating metric discrepancies. Build a reconciliation query: join source → transformed → dashboard and count row-by-row differences. Set up data quality monitoring (row count, NULL checks, timestamp recency) at each pipeline stage.",
      vi: "Luôn xác thực chất lượng dữ liệu trước khi leo thang chênh lệch metric. Xây query đối chiếu: join nguồn → đã biến đổi → dashboard và đếm khác biệt từng dòng. Thiết lập giám sát chất lượng dữ liệu (row count, kiểm tra NULL, độ mới của timestamp) ở mỗi giai đoạn pipeline.",
    },
    followUps: [
      {
        en: "What do you do if the data is correct and the warehouse is wrong?",
        vi: "Bạn làm gì nếu dữ liệu đúng và kho sai?",
      },
      {
        en: "How do you maintain trust in BI reporting after such incidents?",
        vi: "Bạn duy trì niềm tin vào BI reporting sau sự cố này thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Takes the data at face value without investigating",
        vi: "Tin dữ liệu ngay mà không điều tra",
      },
      {
        en: "Blames the warehouse manager immediately",
        vi: "Đổ lỗi cho quản lý kho ngay lập tức",
      },
      {
        en: "No systematic approach to data quality validation",
        vi: "Không có cách tiếp cận hệ thống để xác thực chất lượng dữ liệu",
      },
    ],
  },
  {
    id: "bia-003",
    role: "BI Analyst (SC)",
    level: "Senior",
    type: "adaptation",
    topic: "Data Modeling",
    question: {
      en: "Design a dimensional model for a global supply chain analytics platform. How do you handle multiple currencies, UoM conversions, and slowly changing attributes?",
      vi: "Thiết kế dimensional model cho nền tảng phân tích chuỗi cung ứng toàn cầu. Bạn xử lý nhiều loại tiền tệ, chuyển đổi đơn vị đo, và thuộc tính thay đổi chậm thế nào?",
    },
    businessContext: {
      en: "At Maersk or Flexport, supply chain data spans countries with different currencies and units, requiring a unified analytics layer.",
      vi: "Tại Maersk hay Flexport, dữ liệu chuỗi cung ứng trải qua nhiều quốc gia với tiền tệ và đơn vị khác nhau, cần lớp analytics thống nhất.",
    },
    dataAvailable: {
      en: "Transaction data from 20+ countries, each with local currency and UoM. Exchange rate tables, UoM conversion tables, product/warehouse master data with history.",
      vi: "Dữ liệu giao dịch từ 20+ quốc gia, mỗi nước có tiền tệ và đơn vị đo riêng. Bảng tỷ giá, bảng chuyển đổi đơn vị, dữ liệu master sản phẩm/kho có lịch sử.",
    },
    expectedAnswer: {
      en: "Use a conformed fact table with: (1) base currency and local currency columns + exchange rate at transaction time, (2) base UoM and local UoM columns + conversion factor, (3) SCD Type 2 for product attributes (price, category changes), Type 1 for warehouse corrections. A bridge table for multi-currency reporting.",
      vi: "Dùng fact table chuẩn hóa với: (1) cột tiền tệ cơ sở và tiền tệ địa phương + tỷ giá tại thời điểm giao dịch, (2) cột đơn vị cơ sở và địa phương + hệ số chuyển đổi, (3) SCD Type 2 cho thuộc tính sản phẩm (giá, danh mục thay đổi), Type 1 cho sửa kho. Bridge table cho báo cáo đa tiền tệ.",
    },
    technicalPattern: {
      en: "For multi-currency: store both transaction_amount_local and transaction_amount_base + exchange_rate_id. For SCD: Type 2 (add new row with date range) for historical accuracy, Type 1 (overwrite) for error correction. Avoid Type 3 unless specifically needed.",
      vi: "Cho đa tiền tệ: lưu cả transaction_amount_local và transaction_amount_base + exchange_rate_id. Cho SCD: Type 2 (thêm dòng mới với khoảng ngày) cho chính xác lịch sử, Type 1 (ghi đè) cho sửa lỗi. Tránh Type 3 trừ khi thực sự cần.",
    },
    followUps: [
      {
        en: "How do you handle exchange rate fluctuations in trend reporting?",
        vi: "Bạn xử lý biến động tỷ giá trong báo cáo xu hướng thế nào?",
      },
      {
        en: "What performance considerations matter when querying SCD Type 2 tables at scale?",
        vi: "Yếu tố hiệu suất nào quan trọng khi truy vấn bảng SCD Type 2 ở quy mô lớn?",
      },
    ],
    weakSignals: [
      {
        en: "Doesn't distinguish between SCD types or when to use each",
        vi: "Không phân biệt các loại SCD hoặc khi nào dùng loại nào",
      },
      {
        en: "Stores converted values without preserving original currency data",
        vi: "Lưu giá trị đã quy đổi mà không giữ dữ liệu gốc",
      },
      {
        en: "Ignores performance impact of SCD Type 2 at scale",
        vi: "Bỏ qua tác động hiệu suất của SCD Type 2 ở quy mô lớn",
      },
    ],
  },
  {
    id: "dp-001",
    role: "Demand Planner",
    level: "Fresher",
    type: "theory",
    topic: "Demand Forecasting",
    question: {
      en: "What is the difference between qualitative and quantitative forecasting? When would you use each?",
      vi: "Khác nhau giữa dự báo định tính và định lượng là gì? Khi nào dùng mỗi loại?",
    },
    businessContext: {
      en: "At SharkNinja, launching a new product category requires judgmental forecasts, while mature products use statistical models.",
      vi: "Tại SharkNinja, ra mắt danh mục sản phẩm mới cần dự báo dựa trên phán đoán, trong khi sản phẩm trưởng thành dùng mô hình thống kê.",
    },
    dataAvailable: {
      en: "Historical sales (24+ months) for existing products; new product specs and launch calendar for new lines.",
      vi: "Lịch sử bán hàng (24+ tháng) cho sản phẩm hiện tại; thông số sản phẩm mới và lịch ra mắt cho dòng mới.",
    },
    expectedAnswer: {
      en: "Qualitative: uses expert judgment, market research, and analogies — good for new products or when historical data is absent. Quantitative: uses statistical models (time series, regression) on historical data — good for established products with sufficient history. Often a hybrid approach works best.",
      vi: "Định tính: dùng phán đoán chuyên gia, nghiên cứu thị trường, và tương tự — tốt cho sản phẩm mới hoặc không có dữ liệu lịch sử. Định lượng: dùng mô hình thống kê (chuỗi thời gian, hồi quy) trên dữ liệu lịch sử — tốt cho sản phẩm đã có đủ dữ liệu. Thường kết hợp cả hai là tốt nhất.",
    },
    technicalPattern: {
      en: "Use quantitative methods (moving average, exponential smoothing, ARIMA) as baseline. Override with qualitative overlays for promotions, new product launches, and external events. Track forecast accuracy with MAPE, MAE, and bias metrics.",
      vi: "Dùng phương pháp định lượng (trung bình động, làm mũ, ARIMA) làm baseline. Điều chỉnh định tính cho khuyến mãi, ra mắt sản phẩm, và sự kiện bên ngoài. Theo dõi độ chính xác với MAPE, MAE, và bias.",
    },
    followUps: [
      {
        en: "How do you measure forecast accuracy? What metrics do you track?",
        vi: "Bạn đo độ chính xác dự báo thế nào? Metric nào bạn theo dõi?",
      },
      {
        en: "What do you do when forecast accuracy drops below acceptable levels?",
        vi: "Bạn làm gì khi độ chính xác dự báo xuống dưới mức chấp nhận được?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot name specific quantitative methods",
        vi: "Không kể tên được phương pháp định lượng cụ thể",
      },
      {
        en: "Thinks qualitative is always inferior to quantitative",
        vi: "Nghĩ định tính luôn kém hơn định lượng",
      },
      {
        en: "No awareness of forecast accuracy measurement",
        vi: "Không biết cách đo độ chính xác dự báo",
      },
    ],
  },
  {
    id: "dp-002",
    role: "Demand Planner",
    level: "Junior",
    type: "application",
    topic: "Demand Forecasting",
    question: {
      en: "Your demand forecast for next quarter shows a sudden 30% spike. You suspect a promotion was double-counted in the system. How do you validate and correct this?",
      vi: "Dự báo nhu cầu quý sau của bạn tăng đột biến 30%. Bạn nghi ngờ một chương trình khuyến mãi bị double-count. Bạn xác thực và sửa thế nào?",
    },
    businessContext: {
      en: "At Flipkart or Elmich, promotions drive significant demand spikes. Double-counting promo events leads to overbuying and excess inventory costs.",
      vi: "Tại Flipkart hay Elmich, khuyến mãi tạo ra các đột biến nhu cầu lớn. Double-count sự kiện khuyến mãi dẫn đến mua quá nhiều và chi phí tồn kho dư thừa.",
    },
    dataAvailable: {
      en: "Forecast model output with baseline + promo uplift components. Promo calendar with event IDs and dates. Last year's same-period sales with similar promos.",
      vi: "Đầu ra mô hình dự báo với baseline + thành phần tăng khuyến mãi. Lịch khuyến mãi với ID sự kiện và ngày. Doanh số cùng kỳ năm trước với khuyến mãi tương tự.",
    },
    expectedAnswer: {
      en: "I'd audit the promo calendar for duplicate entries (same promo linked to multiple SKUs or entered twice). Check the forecast model's promo uplift calculation: was it applied multiplicatively on top of overlapping promos? Normalize by comparing the implied uplift % against historical similar promotions. Correct by deduplicating promo events and re-running the forecast.",
      vi: "Tôi sẽ kiểm tra lịch khuyến mãi cho entries trùng (cùng promo gắn với nhiều SKU hoặc nhập hai lần). Kiểm tra cách tính tăng khuyến mãi: có áp dụng chồng lên nhau không? Chuẩn hóa bằng cách so sánh % tăng ngụ ý với khuyến mãi tương tự lịch sử. Sửa bằng cách loại trùng và chạy lại dự báo.",
    },
    technicalPattern: {
      en: "Forecast decomposition: subtract baseline from total forecast to get implied uplift. Cross-reference with promo calendar. Flag any promo where implied uplift > 2x historical average for manual review. Maintain a unique promo constraint in the planning system.",
      vi: "Phân rã dự báo: trừ baseline khỏi tổng để có implied uplift. Đối chiếu với lịch khuyến mãi. Gắn cờ promo nào có implied uplift > 2x trung bình lịch sử để xem xét thủ công. Duy trì ràng buộc unique promo trong hệ thống lập kế hoạch.",
    },
    followUps: [
      {
        en: "How do you prevent this from happening again in the planning system?",
        vi: "Bạn ngăn điều này tái diễn trong hệ thống thế nào?",
      },
      {
        en: "What if there's no historical comparison for this promo type?",
        vi: "Nếu không có dữ liệu lịch sử cho loại promo này thì sao?",
      },
    ],
    weakSignals: [
      {
        en: "Accepts the spike at face value and proceeds with over-ordering",
        vi: "Chấp nhận đột biến và tiến hành đặt hàng quá mức",
      },
      {
        en: "No systematic decomposition of forecast components",
        vi: "Không có cách tiếp cận hệ thống để phân rã thành phần dự báo",
      },
      {
        en: "Cannot trace the promo uplift calculation in the model",
        vi: "Không truy được cách tính tăng khuyến mãi trong mô hình",
      },
    ],
  },
  {
    id: "dp-003",
    role: "Demand Planner",
    level: "Senior",
    type: "adaptation",
    topic: "Demand Forecasting",
    question: {
      en: "Your company is expanding into a new country in Southeast Asia. How do you build a demand forecast from scratch with no historical data, multiple new SKUs, and uncertain market conditions?",
      vi: "Công ty bạn đang mở rộng sang nước mới ở Đông Nam Á. Bạn xây dựng dự báo nhu cầu từ đầu thế nào khi không có dữ liệu lịch sử, nhiều SKU mới, và điều kiện thị trường không chắc chắn?",
    },
    businessContext: {
      en: "At Crossian or HRchannels, entering a new market requires balancing aggressive growth targets with inventory risk.",
      vi: "Tại Crossian hay HRchannels, vào thị trường mới cần cân bằng mục tiêu tăng trưởng với rủi ro tồn kho.",
    },
    dataAvailable: {
      en: "Market size estimates, competitor benchmarks, similar launch data from neighboring countries, population demographics, GDP per capita, e-commerce penetration rate.",
      vi: "Ước tính quy mô thị trường, tham chiếu đối thủ cạnh tranh, dữ liệu ra mắt tương tự từ nước láng giềng, nhân khẩu học, GDP đầu người, tỷ lệ thâm nhập thương mại điện tử.",
    },
    expectedAnswer: {
      en: "I'd use a multi-method approach: (1) Analogous forecasting — use launch data from similar country as baseline, adjusted for GDP/capita differences. (2) Bottom-up market sizing — TAM → SAM → SOM based on demographics. (3) Delphi method with local market experts. (4) Start with conservative inventory — plan for 50-60% of optimistic scenario. Review weekly, adjust quickly.",
      vi: "Tôi dùng cách tiếp cận đa phương pháp: (1) Dự báo tương tự — dùng dữ liệu ra mắt từ nước tương tự làm baseline, điều chỉnh theo GDP đầu người. (2) Định cỡ thị trường bottom-up — TAM → SAM → SOM dựa trên nhân khẩu học. (3) Phương pháp Delphi với chuyên gia địa phương. (4) Bắt đầu với tồn kho thận trọng — lên kế hoạch 50-60% kịch bản lạc quan. Đánh giá hàng tuần, điều chỉnh nhanh.",
    },
    technicalPattern: {
      en: "Analogous forecasting: y_new = y_analog * (GDP_new / GDP_analog)^0.8 (income elasticity). Apply scenario planning: optimistic (P80), expected (P50), conservative (P20). Set safety stock higher than mature markets. Implement short-interval forecast review cycles (weekly vs monthly).",
      vi: "Dự báo tương tự: y_mới = y_tương_tự * (GDP_mới / GDP_tương_tự)^0.8 (độ co giãn thu nhập). Áp dụng kịch bản: lạc quan (P80), kỳ vọng (P50), thận trọng (P20). Đặt tồn kho an toàn cao hơn thị trường trưởng thành. Áp dụng chu kỳ đánh giá dự báo ngắn (hàng tuần thay vì hàng tháng).",
    },
    followUps: [
      {
        en: "How do you handle currency volatility in your cost assumptions?",
        vi: "Bạn xử lý biến động tiền tệ trong giả định chi phí thế nào?",
      },
      {
        en: "What triggers a forecast revision in the first 90 days post-launch?",
        vi: "Điều gì kích hoạt việc sửa dự báo trong 90 ngày đầu sau ra mắt?",
      },
    ],
    weakSignals: [
      {
        en: "Proposes a single forecast number without scenario ranges",
        vi: "Đề xuất một con số dự báo duy nhất không có kịch bản",
      },
      {
        en: "Depends only on one method without cross-validation",
        vi: "Chỉ phụ thuộc một phương pháp không có đối chiếu chéo",
      },
      {
        en: "Ignores local market nuances (culture, infrastructure, regulation)",
        vi: "Bỏ qua sắc thái thị trường địa phương (văn hóa, hạ tầng, quy định)",
      },
    ],
  },
  {
    id: "ia-001",
    role: "Inventory Analyst",
    level: "Fresher",
    type: "theory",
    topic: "Inventory Management",
    question: {
      en: "Explain the concept of Safety Stock. What factors influence how much safety stock you should hold?",
      vi: "Giải thích khái niệm Tồn kho An toàn. Những yếu tố nào ảnh hưởng đến mức tồn kho an toàn bạn nên giữ?",
    },
    businessContext: {
      en: "At Amazon or Flipkart, safety stock protects against demand variability and supply lead time variability to prevent stockouts.",
      vi: "Tại Amazon hay Flipkart, tồn kho an toàn bảo vệ khỏi biến động nhu cầu và thời gian giao hàng để tránh hết hàng.",
    },
    dataAvailable: {
      en: "Historical demand data, supplier lead times, current service level targets (e.g., 95% fill rate).",
      vi: "Dữ liệu nhu cầu lịch sử, thời gian giao hàng nhà cung cấp, mục tiêu mức dịch vụ hiện tại (VD: 95% fill rate).",
    },
    expectedAnswer: {
      en: "Safety stock is extra inventory held to buffer against uncertainty. Factors: demand variability (σD), lead time variability (σLT), target service level (z-score), demand volume. Formula: SS = z * σD * √(LT_avg). More variability or higher service targets = more safety stock.",
      vi: "Tồn kho an toàn là lượng hàng dự trữ thêm để đệm cho sự không chắc chắn. Yếu tố: biến động nhu cầu, biến động thời gian giao, mục tiêu mức dịch vụ, khối lượng nhu cầu. Công thức: SS = z * σD * √(LT_trung_bình). Biến động lớn hơn hoặc mục tiêu dịch vụ cao hơn = tồn kho an toàn nhiều hơn.",
    },
    technicalPattern: {
      en: "Safety stock formula: SS = z * σD * √(LT) for demand variability only. With lead time variability: SS = z * √(σD² * LT + σLT² * D²). Reorder point = (D * LT) + SS. Track stockout rate and adjust z accordingly.",
      vi: "Công thức tồn kho an toàn: SS = z * σD * √(LT) chỉ cho biến động nhu cầu. Với biến động thời gian giao: SS = z * √(σD² * LT + σLT² * D²). Điểm đặt hàng lại = (D * LT) + SS. Theo dõi tỷ lệ hết hàng và điều chỉnh z tương ứng.",
    },
    followUps: [
      {
        en: "What happens to safety stock if lead time doubles?",
        vi: "Chuyện gì xảy ra với tồn kho an toàn nếu thời gian giao tăng gấp đôi?",
      },
      {
        en: "How do you calculate the trade-off between safety stock cost and stockout cost?",
        vi: "Bạn tính toán đánh đổi giữa chi phí tồn kho an toàn và chi phí hết hàng thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Thinks safety stock is a fixed number, not a calculated variable",
        vi: "Nghĩ tồn kho an toàn là số cố định, không phải biến tính toán",
      },
      {
        en: "Cannot write or explain the safety stock formula",
        vi: "Không viết hoặc giải thích được công thức tồn kho an toàn",
      },
      {
        en: "Doesn't connect safety stock to service level targets",
        vi: "Không kết nối tồn kho an toàn với mục tiêu mức dịch vụ",
      },
    ],
  },
  {
    id: "ia-002",
    role: "Inventory Analyst",
    level: "Junior",
    type: "application",
    topic: "Inventory Management",
    question: {
      en: "You notice that inventory turns have dropped from 8 to 5 over the past 6 months. What could be causing this, and how would you analyze the root cause?",
      vi: "Bạn thấy vòng quay tồn kho giảm từ 8 xuống 5 trong 6 tháng qua. Nguyên nhân có thể là gì và bạn phân tích root cause thế nào?",
    },
    businessContext: {
      en: "At any retailer, declining inventory turnover signals excess stock, reducing cash flow and increasing holding costs.",
      vi: "Tại bất kỳ nhà bán lẻ nào, vòng quay tồn kho giảm báo hiệu hàng tồn dư thừa, giảm dòng tiền và tăng chi phí lưu kho.",
    },
    dataAvailable: {
      en: "Monthly inventory levels by SKU and warehouse, sales data, purchase orders, returns data, product lifecycle status.",
      vi: "Mức tồn kho hàng tháng theo SKU và kho, dữ liệu bán hàng, đơn mua hàng, dữ liệu trả hàng, trạng thái vòng đời sản phẩm.",
    },
    expectedAnswer: {
      en: "I'd use a structured decomposition: (1) Segment by SKU/category to find if specific products are driving the change. (2) Break down turns = COGS / Avg Inventory — check if COGS dropped (demand decline) or inventory increased (over-buying). (3) Check for slow-moving / dead stock buildup. (4) Review if there was a major promo buy-in that hasn't sold through. (5) Examine lead time changes or MOQ increases from suppliers.",
      vi: "Tôi dùng phân rã có cấu trúc: (1) Phân khúc theo SKU/danh mục để tìm sản phẩm cụ thể. (2) Phân rã turns = COGS / Tồn kho trung bình — kiểm tra COGS giảm (nhu cầu giảm) hay tồn kho tăng (mua quá nhiều). (3) Kiểm tra hàng chậm/hàng chết. (4) Xem có đợt mua promo lớn chưa bán hết. (5) Xem xét thay đổi thời gian giao hoặc MOQ từ nhà cung cấp.",
    },
    technicalPattern: {
      en: "ABC-XYZ analysis to identify which items contribute most to the decline. Inventory aging report: segment by days on hand (0-30, 31-60, 61-90, 90+). Drill: category → SKU → warehouse to isolate the problem. Use Pareto principle — 20% of SKUs likely drive 80% of the decline.",
      vi: "Phân tích ABC-XYZ để xác định mặt hàng nào đóng góp nhiều nhất vào sự suy giảm. Báo cáo tuổi tồn kho: phân khúc theo ngày lưu kho. Drill: danh mục → SKU → kho để cô lập vấn đề. Dùng nguyên tắc Pareto — 20% SKU thường chiếm 80% sự suy giảm.",
    },
    sqlCode: `WITH inventory_turns AS (
  SELECT
    category,
    SUM(cogs) / NULLIF(AVG(inventory_value), 0) AS turns,
    COUNT(DISTINCT CASE WHEN days_on_hand > 90 THEN sku END) AS dead_stock_skus
  FROM inventory_aging
  WHERE month BETWEEN DATEADD(month, -6, GETDATE()) AND GETDATE()
  GROUP BY category
)
SELECT * FROM inventory_turns ORDER BY turns ASC;`,
    followUps: [
      {
        en: "What's the first action you'd take based on this analysis?",
        vi: "Hành động đầu tiên bạn sẽ làm dựa trên phân tích này là gì?",
      },
      {
        en: "How would you present this to the procurement team without sounding accusatory?",
        vi: "Bạn trình bày điều này với đội thu mua thế nào để không mang tính buộc tội?",
      },
    ],
    weakSignals: [
      {
        en: "Looks only at aggregate without segmenting by SKU/category",
        vi: "Chỉ nhìn tổng thể mà không phân khúc theo SKU/danh mục",
      },
      {
        en: "Assumes the cause without data evidence",
        vi: "Giả định nguyên nhân không có bằng chứng dữ liệu",
      },
      {
        en: "Doesn't distinguish between 'too much inventory' and 'too little sales'",
        vi: "Không phân biệt 'quá nhiều hàng' và 'quá ít bán'",
      },
    ],
  },
  {
    id: "ia-003",
    role: "Inventory Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Inventory Management",
    question: {
      en: "Design an inventory optimization model for a multi-echelon supply chain with central warehouse and regional DCs. How do you set target stock levels at each node?",
      vi: "Thiết kế mô hình tối ưu tồn kho cho chuỗi cung ứng đa cấp với kho trung tâm và DC khu vực. Bạn đặt mức tồn kho mục tiêu ở mỗi nút thế nào?",
    },
    businessContext: {
      en: "At Walmart or DHL, multi-echelon inventory optimization reduces total system inventory while maintaining service levels across all nodes.",
      vi: "Tại Walmart hay DHL, tối ưu tồn kho đa cấp giảm tổng tồn kho hệ thống trong khi duy trì mức dịch vụ ở tất cả các nút.",
    },
    dataAvailable: {
      en: "Demand by DC (daily), lead times from central to DC, lead times from supplier to central, transportation costs, holding costs, service level targets by region.",
      vi: "Nhu cầu theo DC (hàng ngày), thời gian giao từ trung tâm đến DC, từ nhà cung cấp đến trung tâm, chi phí vận chuyển, chi phí lưu kho, mục tiêu dịch vụ theo vùng.",
    },
    expectedAnswer: {
      en: "I'd use a multi-echelon inventory optimization approach: (1) Set DC safety stock based on demand variability and lead time from central. (2) Set central warehouse safety stock to cover aggregate demand variability + risk pooling across DCs. (3) Consider the 'bullwhip effect' — central inventory should be higher than sum of DC safeties due to demand signal amplification. (4) Use DRP (Distribution Requirements Planning) logic with time-phased replenishment.",
      vi: "Tôi dùng phương pháp tối ưu tồn kho đa cấp: (1) Đặt tồn kho an toàn DC dựa trên biến động nhu cầu và thời gian giao từ trung tâm. (2) Đặt tồn kho an toàn kho trung tâm để trang trải biến động nhu cầu tổng hợp + gộp rủi ro qua các DC. (3) Xét hiệu ứng bullwhip — tồn kho trung tâm nên cao hơn tổng tồn kho an toàn DC do khuếch đại tín hiệu nhu cầu. (4) Dùng logic DRP với bổ sung theo thời gian.",
    },
    technicalPattern: {
      en: "Multi-echelon SS formula accounts for lead time decomposition. For 2-echelon: DC_SS = z * σ_demand * √(LT_central_to_DC). Central_SS = z * σ_aggregate * √(LT_supplier_to_central) + buffer for demand signal variance. Use guaranteed service model (GSM) or stochastic service model (SSM) approach.",
      vi: "Công thức SS đa cấp tính đến phân rã thời gian giao. Cho 2 cấp: DC_SS = z * σ_nhu_cầu * √(LT_trung_tâm_đến_DC). Trung_tâm_SS = z * σ_tổng_hợp * √(LT_ncc_đến_trung_tâm) + đệm cho phương sai tín hiệu nhu cầu.",
    },
    followUps: [
      {
        en: "How do you handle inventory balancing between DCs when demand patterns shift?",
        vi: "Bạn xử lý cân bằng tồn kho giữa các DC khi mô hình nhu cầu thay đổi thế nào?",
      },
      {
        en: "What's the risk of centralizing too much inventory vs decentralizing?",
        vi: "Rủi ro của tập trung quá nhiều tồn kho vs phân tán là gì?",
      },
    ],
    weakSignals: [
      {
        en: "Treats each warehouse independently without considering system effects",
        vi: "Xử lý từng kho độc lập không xét hiệu ứng hệ thống",
      },
      {
        en: "Ignores the bullwhip effect in multi-echelon design",
        vi: "Bỏ qua hiệu ứng bullwhip trong thiết kế đa cấp",
      },
      {
        en: "Oversimplifies to single-echelon approach",
        vi: "Đơn giản hóa quá mức thành phương pháp một cấp",
      },
    ],
  },
  {
    id: "spa-001",
    role: "SC Planning Analyst",
    level: "Fresher",
    type: "theory",
    topic: "Supply Chain Planning",
    question: {
      en: "What is the difference between a MPS (Master Production Schedule) and an MRP (Material Requirements Planning) run?",
      vi: "Khác nhau giữa MPS và MRP là gì?",
    },
    businessContext: {
      en: "At any manufacturing company like SharkNinja, understanding MPS vs MRP is fundamental to production planning.",
      vi: "Tại bất kỳ công ty sản xuất nào như SharkNinja, hiểu MPS vs MRP là nền tảng cho hoạch định sản xuất.",
    },
    dataAvailable: {
      en: "Sales forecast, current inventory, BOM (Bill of Materials), lead times, production capacity, open purchase orders.",
      vi: "Dự báo bán hàng, tồn kho hiện tại, BOM, thời gian sản xuất, năng lực sản xuất, đơn mua hàng đang mở.",
    },
    expectedAnswer: {
      en: "MPS is a plan for the production of finished goods: what to produce, how many, and when, based on forecasts and customer orders. MRP takes the MPS and explodes it through the BOM to calculate requirements for raw materials and components, considering inventory on hand and lead times.",
      vi: "MPS là kế hoạch sản xuất thành phẩm: sản xuất gì, bao nhiêu, khi nào, dựa trên dự báo và đơn đặt hàng. MRP lấy MPS và phân rã qua BOM để tính nhu cầu nguyên vật liệu và linh kiện, xét tồn kho hiện có và thời gian sản xuất.",
    },
    technicalPattern: {
      en: "MPS is the input, MRP is the calculation engine. Rough-cut capacity planning validates MPS, then MRP checks material feasibility. The output of MRP is planned orders for purchasing and manufacturing.",
      vi: "MPS là đầu vào, MRP là công cụ tính toán. Hoạch định năng lực thô (RCCP) xác thực MPS, sau đó MRP kiểm tra khả thi vật tư. Đầu ra của MRP là các đơn hàng dự kiến cho mua hàng và sản xuất.",
    },
    followUps: [
      {
        en: "What is a BOM explosion and why is it important for MRP?",
        vi: "BOM explosion là gì và tại sao quan trọng cho MRP?",
      },
      {
        en: "How do you handle a situation where MRP shows material shortages?",
        vi: "Bạn xử lý thế nào khi MRP cho thấy thiếu nguyên vật liệu?",
      },
    ],
    weakSignals: [
      {
        en: "Uses MPS and MRP interchangeably",
        vi: "Dùng MPS và MRP lẫn lộn",
      },
      {
        en: "Doesn't mention BOM in the MRP explanation",
        vi: "Không đề cập BOM trong giải thích MRP",
      },
      {
        en: "Cannot explain the planning sequence (MPS → RCCP → MRP)",
        vi: "Không giải thích được trình tự hoạch định (MPS → RCCP → MRP)",
      },
    ],
  },
  {
    id: "spa-002",
    role: "SC Planning Analyst",
    level: "Junior",
    type: "application",
    topic: "Supply Chain Planning",
    question: {
      en: "The sales team just increased the Q4 forecast by 25%. Production capacity is maxed out and some raw materials have long lead times. How do you respond?",
      vi: "Đội bán hàng vừa tăng dự báo Q4 lên 25%. Năng lực sản xuất đã tối đa và một số nguyên liệu có thời gian giao dài. Bạn phản ứng thế nào?",
    },
    businessContext: {
      en: "At SharkNinja or Crossian, sales-driven forecast changes often create realistic capacity/material challenges.",
      vi: "Tại SharkNinja hay Crossian, thay đổi dự báo từ bán hàng thường tạo ra thách thức về năng lực và vật tư thực tế.",
    },
    dataAvailable: {
      en: "Current MPS, capacity utilization by production line (%), supplier lead times, MOQs, alternative supplier list, inventory of raw materials.",
      vi: "MPS hiện tại, sử dụng năng lực theo dây chuyền (%), thời gian giao nhà cung cấp, MOQ, danh sách nhà cung cấp thay thế, tồn kho nguyên vật liệu.",
    },
    expectedAnswer: {
      en: "I'd run a constraint-based analysis: (1) Check which products are driving the increase and prioritize high-margin or strategic SKUs. (2) Calculate capacity gap and explore options: overtime, additional shifts, outsourcing. (3) Identify long-lead-time materials and check if early ordering is feasible. (4) Propose a phased ramp-up to sales. (5) If still constrained, recommend allocation strategy based on customer priority.",
      vi: "Tôi chạy phân tích dựa trên ràng buộc: (1) Kiểm tra sản phẩm nào tăng và ưu tiên SKU có biên lợi nhuận cao hoặc chiến lược. (2) Tính toán chênh lệch năng lực và khám phá: tăng ca, ca phụ, thuê ngoài. (3) Xác định vật tư có thời gian giao dài và kiểm tra có thể đặt sớm. (4) Đề xuất tăng dần theo giai đoạn. (5) Nếu vẫn hạn chế, đề xuất phân bổ theo ưu tiên khách hàng.",
    },
    technicalPattern: {
      en: "Constraint-based planning using a feasibility matrix: check capacity (labor/machine hours) AND material (inventory + PO + lead time) simultaneously. Run a rough-cut capacity plan (RCCP) first, then CRP if more detail is needed. Use what-if scenarios in the planning system.",
      vi: "Hoạch định dựa trên ràng buộc dùng ma trận khả thi: kiểm tra năng lực (giờ lao động/máy) VÀ vật tư (tồn kho + PO + thời gian giao) đồng thời. Chạy RCCP trước, CRP nếu cần chi tiết hơn. Dùng kịch bản what-if trong hệ thống hoạch định.",
    },
    followUps: [
      {
        en: "What information do you need from sales to validate the forecast increase?",
        vi: "Bạn cần thông tin gì từ bán hàng để xác thực tăng dự báo?",
      },
      {
        en: "How do you communicate capacity constraints to sales without damaging the relationship?",
        vi: "Bạn truyền đạt hạn chế năng lực cho bán hàng thế nào để không ảnh hưởng mối quan hệ?",
      },
    ],
    weakSignals: [
      {
        en: "Says yes to everything without checking feasibility",
        vi: "Nói đồng ý với mọi thứ không kiểm tra khả thi",
      },
      {
        en: "Focuses only on capacity OR materials, not both simultaneously",
        vi: "Chỉ tập trung năng lực HOẶC vật tư, không đồng thời cả hai",
      },
      {
        en: "Doesn't propose trade-offs or prioritization",
        vi: "Không đề xuất đánh đổi hoặc ưu tiên",
      },
    ],
  },
  {
    id: "spa-003",
    role: "SC Planning Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Supply Chain Planning",
    question: {
      en: "Your S&OP process is broken — sales forecasts are always optimistic, operations plans conservatively, and finance cuts everything by 10%. How do you fix this?",
      vi: "Quy trình S&OP của bạn bị hỏng — dự báo bán hàng luôn lạc quan, vận hành lập kế hoạch thận trọng, và tài chính cắt mọi thứ 10%. Bạn sửa thế nào?",
    },
    businessContext: {
      en: "At any large company, S&OP misalignment is a classic problem leading to excess inventory or stockouts.",
      vi: "Tại bất kỳ công ty lớn nào, lệch lạc S&OP là vấn đề kinh điển dẫn đến tồn kho dư thừa hoặc hết hàng.",
    },
    dataAvailable: {
      en: "Historical forecast accuracy by product family, previous S&OP meeting minutes, actual vs plan variance reports, inventory results by scenario.",
      vi: "Độ chính xác dự báo lịch sử theo nhóm sản phẩm, biên bản họp S&OP trước, báo cáo chênh lệch thực tế vs kế hoạch, kết quả tồn kho theo kịch bản.",
    },
    expectedAnswer: {
      en: "I'd implement a data-driven S&OP with: (1) unbiased forecast — statistical baseline with agreed override rules. (2) Track each function's bias (sales over-forecast by X%, ops under-plan by Y%) and use this to calibrate. (3) One version of the truth — single operating plan with agreed assumptions. (4) Scenario planning with probabilistic ranges instead of single numbers. (5) S&OP KPIs tracked and reviewed monthly with function heads.",
      vi: "Tôi triển khai S&OP dựa trên dữ liệu: (1) dự báo không thiên vị — baseline thống kê với quy tắc điều chỉnh được thống nhất. (2) Theo dõi độ lệch của từng chức năng (bán hàng dự báo quá cao X%, vận hành lập kế hoạch quá thấp Y%) và dùng để hiệu chỉnh. (3) Một phiên bản sự thật duy nhất — kế hoạch vận hành với giả định thống nhất. (4) Hoạch định kịch bản với dải xác suất thay vì số duy nhất. (5) KPI S&OP theo dõi và đánh giá hàng tháng với trưởng chức năng.",
    },
    technicalPattern: {
      en: "Forecast value add (FVA) analysis: measure each touchpoint's contribution to forecast accuracy or degradation. Statistical baseline → Sales override → Ops override → Finance override. Remove steps that consistently add error. Bias tracking: calculate Mean Percentage Error (MPE) per function per product family and display visibly in S&OP reviews.",
      vi: "Phân tích FVA: đo lường đóng góp của từng điểm chạm vào độ chính xác dự báo. Baseline thống kê → Sales override → Ops override → Finance override. Loại bỏ bước nào thường xuyên thêm sai số. Theo dõi độ lệch: tính MPE theo chức năng và nhóm sản phẩm, hiển thị rõ ràng trong họp S&OP.",
    },
    followUps: [
      {
        en: "How do you handle 'political' pressure to inflate the forecast?",
        vi: "Bạn xử lý áp lực chính trị để thổi phồng dự báo thế nào?",
      },
      {
        en: "What metrics would you put on an S&OP balanced scorecard?",
        vi: "Metric nào bạn đưa vào thẻ điểm cân bằng S&OP?",
      },
    ],
    weakSignals: [
      {
        en: "Focuses solely on forecast accuracy without addressing process/governance",
        vi: "Chỉ tập trung vào độ chính xác dự báo không giải quyết quy trình/quản trị",
      },
      {
        en: "Accepts bias as normal without quantifying or correcting it",
        vi: "Chấp nhận độ lệch là bình thường không lượng hóa hoặc sửa",
      },
      {
        en: "No proposal for structural change in the S&OP process",
        vi: "Không đề xuất thay đổi cấu trúc trong quy trình S&OP",
      },
    ],
  },
  {
    id: "la-001",
    role: "Logistics Analyst",
    level: "Fresher",
    type: "theory",
    topic: "Logistics Optimization",
    question: {
      en: "What key metrics would you track to measure logistics performance in a distribution network?",
      vi: "Những metric chính nào bạn theo dõi để đo hiệu suất logistics trong mạng lưới phân phối?",
    },
    businessContext: {
      en: "At DHL or FedEx, logistics performance directly impacts customer satisfaction and operational costs.",
      vi: "Tại DHL hay FedEx, hiệu suất logistics ảnh hưởng trực tiếp đến sự hài lòng khách hàng và chi phí vận hành.",
    },
    dataAvailable: {
      en: "Shipment records, delivery confirmation timestamps, cost records, customer feedback data by route.",
      vi: "Hồ sơ lô hàng, dấu thời gian xác nhận giao, hồ sơ chi phí, phản hồi khách hàng theo tuyến.",
    },
    expectedAnswer: {
      en: "Core metrics: (1) On-Time Delivery % — delivered by promised date. (2) Cost per shipment / Cost per mile. (3) Transportation cost as % of sales. (4) Average transit time / Transit time variability. (5) Damage rate. (6) Vehicle utilization %. (7) Stops per route. (8) Driver turnover rate for fleet operations.",
      vi: "Metric cốt lõi: (1) % giao đúng hạn. (2) Chi phí mỗi lô hàng / mỗi dặm. (3) Chi phí vận chuyển % doanh số. (4) Thời gian vận chuyển trung bình / biến động. (5) Tỷ lệ hư hỏng. (6) % sử dụng phương tiện. (7) Điểm dừng mỗi tuyến. (8) Tỷ lệ nghỉ việc tài xế cho đội xe.",
    },
    technicalPattern: {
      en: "Build a logistics scorecard with leading indicators (vehicle utilization, driver hours) and lagging indicators (OTIF, cost per mile). Benchmark against industry standards. Monitor trends at daily/weekly/monthly frequencies.",
      vi: "Xây thẻ điểm logistics với chỉ số dẫn (sử dụng phương tiện, giờ tài xế) và chỉ số phản ánh (OTIF, chi phí mỗi dặm). So sánh chuẩn ngành. Theo dõi xu hướng hàng ngày/tuần/tháng.",
    },
    followUps: [
      {
        en: "Which metric would you prioritize if cost reduction is the goal?",
        vi: "Metric nào bạn ưu tiên nếu mục tiêu là giảm chi phí?",
      },
      {
        en: "How do you benchmark these metrics against industry standards?",
        vi: "Bạn so sánh các metric này với chuẩn ngành thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Only mentions delivery speed without cost or quality metrics",
        vi: "Chỉ đề cập tốc độ giao hàng không đề cập chi phí hoặc chất lượng",
      },
      {
        en: "Cannot distinguish between leading and lagging indicators",
        vi: "Không phân biệt được chỉ số dẫn và chỉ số phản ánh",
      },
      {
        en: "Lists metrics but can't explain how to calculate them",
        vi: "Liệt kê metric không giải thích cách tính",
      },
    ],
  },
  {
    id: "la-002",
    role: "Logistics Analyst",
    level: "Junior",
    type: "application",
    topic: "Logistics Optimization",
    question: {
      en: "You have last-mile delivery data showing that one route consistently costs 40% more per stop than similar routes. How do you analyze and optimize it?",
      vi: "Dữ liệu giao hàng chặng cuối cho thấy một tuyến đường có chi phí mỗi điểm dừng cao hơn 40% so với tuyến tương tự. Bạn phân tích và tối ưu thế nào?",
    },
    businessContext: {
      en: "At DHL or VN Post, last-mile delivery is the most expensive part of logistics, and route optimization is a major cost lever.",
      vi: "Tại DHL hay VN Post, giao hàng chặng cuối là phần đắt nhất và tối ưu tuyến là đòn bẩy chi phí lớn.",
    },
    dataAvailable: {
      en: "Route performance data (cost, stops, distance, time, driver) per route per day for the past 3 months. Traffic patterns, road conditions, customer density.",
      vi: "Dữ liệu hiệu suất tuyến (chi phí, điểm dừng, khoảng cách, thời gian, tài xế) theo tuyến mỗi ngày. Mô hình giao thông, điều kiện đường, mật độ khách hàng.",
    },
    expectedAnswer: {
      en: "I'd segment the analysis: (1) Is the cost driver distance (longer route) or time (traffic) or stops (inefficient clustering)? (2) Compare to benchmark routes with similar stop density. (3) Check customer density — are stops spread out? (4) Look at driver behavior — dwell time per stop, route sequence. (5) Propose: re-clustering stops, different time windows, or alternative vehicle type. (6) If geography is the issue, talk to ops about delivery zone redesign.",
      vi: "Tôi phân khúc: (1) Chi phí do khoảng cách (tuyến dài hơn) hay thời gian (giao thông) hay điểm dừng (phân cụm không hiệu quả)? (2) So với tuyến chuẩn có mật độ điểm dừng tương tự. (3) Mật độ khách hàng có rải rác? (4) Hành vi tài xế — thời gian mỗi điểm dừng, thứ tự tuyến. (5) Đề xuất: phân cụm lại điểm dừng, khung giờ khác, hoặc loại xe khác. (6) Nếu do địa lý, trao đổi với vận hành về thiết kế lại vùng giao.",
    },
    technicalPattern: {
      en: "Use root cause analysis (Ishikawa/fishbone) to categorize causes: Man (driver), Machine (vehicle), Method (route sequence), Material (package characteristics), Measurement (data accuracy), Mother Nature (traffic/weather). Quantify impact of each factor with regression or correlation analysis.",
      vi: "Dùng RCA (Ishikawa/fishbone) để phân loại nguyên nhân: Con người (tài xế), Máy móc (xe), Phương pháp (thứ tự tuyến), Vật liệu (đặc điểm gói hàng), Đo lường (độ chính xác dữ liệu), Môi trường (giao thông/thời tiết). Định lượng tác động mỗi yếu tố bằng hồi quy hoặc tương quan.",
    },
    followUps: [
      {
        en: "What data quality issues could mislead your analysis of this route?",
        vi: "Vấn đề chất lượng dữ liệu nào có thể làm sai lệch phân tích?",
      },
      {
        en: "How would you test a route optimization change before rolling out?",
        vi: "Bạn test thay đổi tối ưu tuyến thế nào trước khi triển khai?",
      },
    ],
    weakSignals: [
      {
        en: "Blames the driver without analyzing underlying causes",
        vi: "Đổ lỗi tài xế không phân tích nguyên nhân gốc",
      },
      {
        en: "Proposes a solution without data-driven diagnosis",
        vi: "Đề xuất giải pháp không qua chẩn đoán dữ liệu",
      },
      {
        en: "Looks only at cost without considering service level impact",
        vi: "Chỉ nhìn chi phí không xét tác động mức dịch vụ",
      },
    ],
  },
  {
    id: "la-003",
    role: "Logistics Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Logistics Optimization",
    question: {
      en: "Design a network optimization model to decide where to locate a new distribution center in Southeast Asia. What factors and data would you consider?",
      vi: "Thiết kế mô hình tối ưu mạng lưới để quyết định đặt trung tâm phân phối mới ở Đông Nam Á. Yếu tố và dữ liệu nào bạn xem xét?",
    },
    businessContext: {
      en: "At Maersk or Flexport, distribution network design is a multi-million dollar decision affecting 5-10 years of operations.",
      vi: "Tại Maersk hay Flexport, thiết kế mạng lưới phân phối là quyết định nhiều triệu đô ảnh hưởng 5-10 năm vận hành.",
    },
    dataAvailable: {
      en: "Customer locations and demand volumes, supplier locations, transportation rates, real estate costs, labor costs, tax incentives, infrastructure quality by location.",
      vi: "Vị trí khách hàng và khối lượng nhu cầu, vị trí nhà cung cấp, giá cước vận chuyển, chi phí bất động sản, chi phí lao động, ưu đãi thuế, chất lượng hạ tầng theo địa điểm.",
    },
    expectedAnswer: {
      en: "I'd build a center-of-gravity model: (1) Calculate weighted center based on demand volume and transportation cost. (2) Add constraints: labor availability, infrastructure, tax zones, political stability. (3) Run 'what-if' scenarios: centralized vs decentralized network. (4) Total cost = inbound transportation + outbound transportation + facility cost + inventory carrying cost. (5) Sensitivity analysis on key assumptions (fuel cost, demand growth). (6) Present trade-offs: cost vs service level vs risk.",
      vi: "Tôi xây mô hình center-of-gravity: (1) Tính trọng tâm dựa trên khối lượng nhu cầu và chi phí vận chuyển. (2) Thêm ràng buộc: lao động, hạ tầng, thuế, ổn định chính trị. (3) Chạy kịch bản 'what-if': tập trung vs phân tán. (4) Tổng chi phí = vận chuyển đầu vào + đầu ra + chi phí cơ sở + chi phí lưu kho. (5) Phân tích độ nhạy trên giả định chính. (6) Trình bày đánh đổi: chi phí vs mức dịch vụ vs rủi ro.",
    },
    technicalPattern: {
      en: "Center-of-gravity formula: weighted average of coordinates. More advanced: mixed-integer linear programming (MILP) with binary facility location variables. Software: supply chain network design tools (Llamasoft, Supply Chain Guru, or Python with PuLP/OR-Tools). Key constraint: min/max number of facilities, service time windows, capacity limits.",
      vi: "Công thức center-of-gravity: trung bình có trọng số tọa độ. Nâng cao: MILP với biến nhị phân vị trí cơ sở. Phần mềm: công cụ thiết kế mạng lưới (Llamasoft, Supply Chain Guru, hoặc Python PuLP/OR-Tools). Ràng buộc: số lượng cơ sở tối thiểu/tối đa, cửa sổ thời gian dịch vụ, giới hạn năng lực.",
    },
    followUps: [
      {
        en: "How do you incorporate risk factors like natural disasters or political instability?",
        vi: "Bạn đưa yếu tố rủi ro như thiên tai hoặc bất ổn chính trị vào thế nào?",
      },
      {
        en: "What's the minimum viable data you need to make a recommendation?",
        vi: "Dữ liệu tối thiểu bạn cần để đưa ra khuyến nghị là gì?",
      },
    ],
    weakSignals: [
      {
        en: "Uses only intuition without quantitative modeling",
        vi: "Chỉ dùng trực giác không có mô hình định lượng",
      },
      {
        en: "Ignores qualitative factors (regulation, politics, labor)",
        vi: "Bỏ qua yếu tố định tính (quy định, chính trị, lao động)",
      },
      {
        en: "Recommends a single location without scenario comparison",
        vi: "Đề xuất một vị trí không so sánh kịch bản",
      },
    ],
  },
  {
    id: "pra-001",
    role: "Procurement Analyst",
    level: "Fresher",
    type: "theory",
    topic: "Procurement",
    question: {
      en: "What is the difference between a Purchase Order (PO) and a contract in procurement? How are they related in the procure-to-pay process?",
      vi: "Khác nhau giữa Đơn mua hàng (PO) và hợp đồng trong mua hàng là gì? Chúng liên quan thế nào trong quy trình mua hàng đến thanh toán?",
    },
    businessContext: {
      en: "At any company, the PO-contract relationship is fundamental to procurement compliance and spend control.",
      vi: "Tại bất kỳ công ty nào, mối quan hệ PO-hợp đồng là nền tảng cho tuân thủ mua hàng và kiểm soát chi tiêu.",
    },
    dataAvailable: {
      en: "Contract records (long-term pricing agreements, terms), PO records (individual transactions), supplier master data, invoice records.",
      vi: "Hồ sơ hợp đồng (thỏa thuận giá dài hạn, điều khoản), hồ sơ PO (giao dịch), dữ liệu master nhà cung cấp, hồ sơ hóa đơn.",
    },
    expectedAnswer: {
      en: "A contract is a long-term agreement establishing terms (pricing, payment, delivery) with a supplier. A PO is a specific transaction against that contract (or standalone) for a defined quantity of goods/services. The PO references the contract for pricing and terms. In P2P: contract → requisition → PO → goods receipt → invoice → payment.",
      vi: "Hợp đồng là thỏa thuận dài hạn thiết lập điều khoản (giá, thanh toán, giao hàng) với nhà cung cấp. PO là giao dịch cụ thể dựa trên hợp đồng (hoặc độc lập) cho một số lượng hàng hóa/dịch vụ xác định. PO tham chiếu hợp đồng để lấy giá và điều khoản. Trong P2P: hợp đồng → yêu cầu → PO → nhận hàng → hóa đơn → thanh toán.",
    },
    technicalPattern: {
      en: "In ERP systems: PO links to contract via a contract reference field. Contract provides pricing, PO creates commitment. Key controls: no PO allowed without valid contract for certain spend categories, PO value cannot exceed contract remaining balance.",
      vi: "Trong ERP: PO liên kết hợp đồng qua trường tham chiếu hợp đồng. Hợp đồng cung cấp giá, PO tạo cam kết. Kiểm soát: không cho tạo PO không có hợp đồng hợp lệ cho một số hạng mục, giá trị PO không vượt quá số dư hợp đồng còn lại.",
    },
    followUps: [
      {
        en: "What happens if a PO exceeds the contract value?",
        vi: "Chuyện gì xảy ra nếu PO vượt quá giá trị hợp đồng?",
      },
      {
        en: "How do you manage POs that are created before a contract is signed?",
        vi: "Bạn quản lý PO được tạo trước khi hợp đồng ký thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Uses PO and contract interchangeably",
        vi: "Dùng PO và hợp đồng lẫn lộn",
      },
      {
        en: "Doesn't know the P2P process sequence",
        vi: "Không biết trình tự quy trình P2P",
      },
      {
        en: "Cannot explain how pricing flows from contract to PO",
        vi: "Không giải thích được giá chảy từ hợp đồng sang PO thế nào",
      },
    ],
  },
  {
    id: "pra-002",
    role: "Procurement Analyst",
    level: "Junior",
    type: "application",
    topic: "Procurement",
    question: {
      en: "You're analyzing spend data and find that 3 suppliers account for 70% of spend. What risks does this concentration pose and how would you mitigate them?",
      vi: "Bạn phân tích dữ liệu chi tiêu và thấy 3 nhà cung cấp chiếm 70% chi tiêu. Rủi ro tập trung này là gì và bạn giảm thiểu thế nào?",
    },
    businessContext: {
      en: "At Flexport or Maersk, supplier concentration risk became critical during COVID-19 disruptions.",
      vi: "Tại Flexport hay Maersk, rủi ro tập trung nhà cung cấp trở nên nghiêm trọng trong gián đoạn COVID-19.",
    },
    dataAvailable: {
      en: "Spend data by supplier (last 12 months), supplier financial health reports, alternative supplier list, lead time data, quality metrics by supplier.",
      vi: "Dữ liệu chi tiêu theo nhà cung cấp (12 tháng qua), báo cáo tài chính nhà cung cấp, danh sách nhà cung cấp thay thế, thời gian giao hàng, chất lượng theo nhà cung cấp.",
    },
    expectedAnswer: {
      en: "Risks: (1) Single-point-of-failure — if one supplier fails, 23% of spend is at risk. (2) Pricing power — suppliers can increase prices. (3) Quality complacency — less incentive to maintain quality. Mitigation: (a) Supplier diversification strategy — identify which products can be dual-sourced. (b) Develop alternative suppliers. (c) Supplier risk monitoring (financial health, geopolitical risk). (d) Hold safety stock for critical single-source items.",
      vi: "Rủi ro: (1) Điểm hỏng duy nhất — nếu một nhà cung cấp hỏng, 23% chi tiêu gặp rủi ro. (2) Sức mạnh định giá — nhà cung cấp có thể tăng giá. (3) Chất lượng giảm — ít động lực duy trì chất lượng. Giảm thiểu: (a) Chiến lược đa dạng hóa — xác định sản phẩm có thể mua từ hai nguồn. (b) Phát triển nhà cung cấp thay thế. (c) Giám sát rủi ro nhà cung cấp (tài chính, địa chính trị). (d) Giữ tồn kho an toàn cho mặt hàng chỉ một nguồn.",
    },
    technicalPattern: {
      en: "Spend concentration analysis: calculate Herfindahl-Hirschman Index (HHI) = sum of (supplier_share^2). HHI > 0.25 = highly concentrated. Portfolio analysis: Kraljic matrix (supply risk vs profit impact) to classify items as strategic, leverage, bottleneck, or non-critical and determine appropriate sourcing strategy per quadrant.",
      vi: "Phân tích tập trung chi tiêu: tính HHI = tổng (tỷ_trọng_ncc^2). HHI > 0.25 = tập trung cao. Ma trận Kraljic (rủi ro cung ứng vs tác động lợi nhuận) để phân loại và xác định chiến lược thu mua phù hợp cho mỗi góc phần tư.",
    },
    sqlCode: `WITH spend_by_supplier AS (
  SELECT supplier_id, SUM(amount) AS total_spend
  FROM purchase_orders
  WHERE order_date >= DATEADD(year, -1, GETDATE())
  GROUP BY supplier_id
),
total AS (SELECT SUM(total_spend) AS grand_total FROM spend_by_supplier)
SELECT
  supplier_id,
  total_spend,
  total_spend / grand_total AS pct_of_total,
  POWER(total_spend / grand_total, 2) AS squared_share
FROM spend_by_supplier, total
ORDER BY total_spend DESC;`,
    followUps: [
      {
        en: "What criteria would you use to select an alternative supplier?",
        vi: "Tiêu chí nào bạn dùng để chọn nhà cung cấp thay thế?",
      },
      {
        en: "How would you balance diversification vs the cost advantages of consolidation?",
        vi: "Bạn cân bằng đa dạng hóa vs lợi thế chi phí của tập trung thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Recommends immediate diversification without analyzing switching costs",
        vi: "Đề xuất đa dạng hóa ngay không phân tích chi phí chuyển đổi",
      },
      {
        en: "Only identifies risks without proposing mitigations",
        vi: "Chỉ xác định rủi ro không đề xuất giảm thiểu",
      },
      {
        en: "No knowledge of supplier concentration metrics (HHI, Kraljic)",
        vi: "Không biết metric đo tập trung nhà cung cấp",
      },
    ],
  },
  {
    id: "pra-003",
    role: "Procurement Analyst",
    level: "Senior",
    type: "adaptation",
    topic: "Procurement",
    question: {
      en: "Design a supplier performance scorecard for strategic suppliers. What dimensions and KPIs would you include, and how would you weight them?",
      vi: "Thiết kế thẻ điểm hiệu suất nhà cung cấp cho nhà cung cấp chiến lược. Bạn bao gồm khía cạnh và KPI nào, trọng số ra sao?",
    },
    businessContext: {
      en: "At any manufacturer or retailer, strategic supplier management directly impacts supply chain resilience and cost competitiveness.",
      vi: "Tại bất kỳ nhà sản xuất hay bán lẻ nào, quản lý nhà cung cấp chiến lược ảnh hưởng trực tiếp đến khả năng phục hồi và cạnh tranh chi phí.",
    },
    dataAvailable: {
      en: "Delivery performance data, quality inspection results, pricing history, supplier financial reports, innovation contributions, lead time records, responsiveness to RFQs.",
      vi: "Dữ liệu hiệu suất giao hàng, kết quả kiểm tra chất lượng, lịch sử giá, báo cáo tài chính nhà cung cấp, đóng góp đổi mới, thời gian giao hàng, khả năng đáp ứng RFQ.",
    },
    expectedAnswer: {
      en: "I'd design a balanced scorecard with 5 dimensions: (1) Quality (30%) — defect rate, PPM, return rate, certification status. (2) Delivery (25%) — OTIF, lead time reliability, fill rate. (3) Cost (20%) — price competitiveness, cost reduction initiatives, payment terms. (4) Service (15%) — responsiveness, communication, problem resolution time. (5) Innovation (10%) — new ideas, sustainability initiatives, technology adoption. Weighted score = sum of (dimension_score * weight). Review quarterly with business review meetings.",
      vi: "Tôi thiết kế thẻ điểm cân bằng với 5 khía cạnh: (1) Chất lượng (30%) — tỷ lệ lỗi, PPM, tỷ lệ trả hàng, chứng chỉ. (2) Giao hàng (25%) — OTIF, độ tin cậy thời gian giao, fill rate. (3) Chi phí (20%) — cạnh tranh giá, sáng kiến giảm chi phí, điều khoản thanh toán. (4) Dịch vụ (15%) — khả năng đáp ứng, giao tiếp, thời gian giải quyết vấn đề. (5) Đổi mới (10%) — ý tưởng mới, sáng kiến bền vững, áp dụng công nghệ. Điểm có trọng số = tổng (điểm_dimension * trọng_số). Đánh giá hàng quý với họp review.",
    },
    technicalPattern: {
      en: "Weighting methods: use AHP (Analytic Hierarchy Process) or simple pairwise ranking with stakeholders. Normalize scores on a 0-100 scale. Segment suppliers into tiers: Top (90+), Standard (70-89), Development (50-69), At Risk (<50). Link score to commercial actions — top suppliers get preferential payment terms or longer contracts.",
      vi: "Phương pháp trọng số: dùng AHP hoặc xếp hạng cặp đơn giản với stakeholder. Chuẩn hóa điểm thang 0-100. Phân khúc: Tốp (90+), Chuẩn (70-89), Cần phát triển (50-69), Rủi ro (<50). Gắn điểm với hành động thương mại — nhà cung cấp tốp đầu được ưu đãi thanh toán hoặc hợp đồng dài hơn.",
    },
    followUps: [
      {
        en: "How do you handle suppliers that dispute their score?",
        vi: "Bạn xử lý thế nào với nhà cung cấp tranh chấp điểm?",
      },
      {
        en: "What do you do when a strategic supplier consistently scores low?",
        vi: "Bạn làm gì khi nhà cung cấp chiến lược liên tục điểm thấp?",
      },
    ],
    weakSignals: [
      {
        en: "Focuses only on cost and quality, ignoring service and innovation",
        vi: "Chỉ tập trung chi phí và chất lượng, bỏ qua dịch vụ và đổi mới",
      },
      {
        en: "No clear methodology for weighting or scoring",
        vi: "Không có phương pháp rõ ràng cho trọng số hoặc chấm điểm",
      },
      {
        en: "Doesn't connect score outcomes to supplier relationship actions",
        vi: "Không kết nối kết quả điểm với hành động quan hệ nhà cung cấp",
      },
    ],
  },
  {
    id: "scde-001",
    role: "SC Data Engineer",
    level: "Fresher",
    type: "theory",
    topic: "Data Pipeline",
    question: {
      en: "What is the difference between ETL and ELT? Which approach is more suitable for supply chain analytics?",
      vi: "Khác nhau giữa ETL và ELT là gì? Cách tiếp cận nào phù hợp hơn cho phân tích chuỗi cung ứng?",
    },
    businessContext: {
      en: "At Flexport or Maersk, data pipelines process terabytes of supply chain data daily from diverse sources (ERP, WMS, TMS, IoT sensors).",
      vi: "Tại Flexport hay Maersk, data pipeline xử lý terabytes dữ liệu chuỗi cung ứng hàng ngày từ nhiều nguồn (ERP, WMS, TMS, IoT).",
    },
    dataAvailable: {
      en: "Raw data from 10+ source systems including IoT tracking devices, EDI messages, ERP exports, CSV uploads from partners.",
      vi: "Dữ liệu thô từ 10+ hệ thống nguồn bao gồm thiết bị IoT, tin nhắn EDI, xuất ERP, upload CSV từ đối tác.",
    },
    expectedAnswer: {
      en: "ETL (Extract-Transform-Load) transforms data before loading into the warehouse. ELT (Extract-Load-Transform) loads raw data first, transforms in the warehouse. ELT is more suitable for supply chain analytics because: (1) diverse source schemas need flexible transformation. (2) modern warehouse (Snowflake, BigQuery) has powerful compute for transformation. (3) raw data preservation enables reprocessing when business rules change.",
      vi: "ETL biến đổi dữ liệu trước khi load vào warehouse. ELT load dữ liệu thô trước, biến đổi trong warehouse. ELT phù hợp hơn vì: (1) nhiều nguồn schema khác nhau cần biến đổi linh hoạt. (2) warehouse hiện đại có tính toán mạnh cho biến đổi. (3) giữ dữ liệu thô cho phép xử lý lại khi quy tắc thay đổi.",
    },
    technicalPattern: {
      en: "Modern supply chain data architecture: raw layer (ELT) → staging layer → dimensional model. Use incremental loading with CDC (change data capture) for large tables. Raw data is immutable — transformations are applied on read or via dbt models.",
      vi: "Kiến trúc dữ liệu chuỗi cung ứng hiện đại: lớp thô (ELT) → lớp tạm → mô hình dimensional. Dùng tải gia tăng với CDC cho bảng lớn. Dữ liệu thô bất biến — biến đổi áp dụng khi đọc hoặc qua dbt models.",
    },
    followUps: [
      {
        en: "How do you handle schema changes from source systems in an ELT pipeline?",
        vi: "Bạn xử lý thay đổi schema từ hệ thống nguồn trong pipeline ELT thế nào?",
      },
      {
        en: "What tools have you used for supply chain data orchestration?",
        vi: "Công cụ nào bạn đã dùng để điều phối dữ liệu chuỗi cung ứng?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot explain the key difference (where transformation happens)",
        vi: "Không giải thích được khác biệt chính (nơi biến đổi xảy ra)",
      },
      {
        en: "Thinks ETL is always better without context",
        vi: "Nghĩ ETL luôn tốt hơn không xét ngữ cảnh",
      },
      {
        en: "No awareness of CDC or incremental loading for large data volumes",
        vi: "Không biết CDC hoặc tải gia tăng cho khối lượng dữ liệu lớn",
      },
    ],
  },
  {
    id: "scde-002",
    role: "SC Data Engineer",
    level: "Junior",
    type: "application",
    topic: "Data Pipeline",
    question: {
      en: "Your daily supply chain data pipeline failed last night. The shipment tracking table didn't refresh. How do you troubleshoot and recover?",
      vi: "Pipeline dữ liệu chuỗi cung ứng hàng ngày bị lỗi đêm qua. Bảng theo dõi lô hàng không được refresh. Bạn xử lý thế nào?",
    },
    businessContext: {
      en: "At any logistics company, a failed pipeline means delayed reports and operational decisions are made without data.",
      vi: "Tại bất kỳ công ty logistics nào, pipeline hỏng có nghĩa là báo cáo trễ và quyết định vận hành không có dữ liệu.",
    },
    dataAvailable: {
      en: "Pipeline DAG logs, error messages, source system status, warehouse tables status, previous successful run metadata.",
      vi: "Nhật ký pipeline DAG, thông báo lỗi, trạng thái hệ thống nguồn, trạng thái bảng warehouse, metadata lần chạy thành công trước.",
    },
    expectedAnswer: {
      en: "I'd follow a systematic approach: (1) Check the DAG logs for the error — was it a source system issue (connection timeout, API failure) or transformation error (data type mismatch, constraint violation)? (2) Check source system health. (3) If source issue: re-run when source is back, with backfill for missed window. (4) If transformation issue: fix the data quality issue and re-run. (5) If table is partially loaded: truncate and reload or upsert. (6) Set up alerting and automated retry with exponential backoff.",
      vi: "Tôi làm theo cách có hệ thống: (1) Kiểm tra log DAG — lỗi từ nguồn (timeout, API failure) hay biến đổi (sai kiểu dữ liệu, vi phạm ràng buộc)? (2) Kiểm tra sức khỏe nguồn. (3) Nếu lỗi nguồn: chạy lại khi nguồn hoạt động, backfill cho khoảng thiếu. (4) Nếu lỗi biến đổi: sửa lỗi chất lượng dữ liệu chạy lại. (5) Nếu bảng load một phần: truncate và load lại hoặc upsert. (6) Thiết lập cảnh báo và tự động thử lại với exponential backoff.",
    },
    technicalPattern: {
      en: "Pipeline operations checklist: (1) Check DAG status in Airflow/Prefect. (2) Read task logs for exception stack trace. (3) Verify source connectivity. (4) Check for upstream dependency failures. (5) Implement idempotent pipeline design — re-running should produce same result. (6) Use data quality checks after each pipeline stage.",
      vi: "Checklist vận hành pipeline: (1) Kiểm tra trạng thái DAG. (2) Đọc log tác vụ. (3) Xác minh kết nối nguồn. (4) Kiểm tra lỗi phụ thuộc upstream. (5) Thiết kế pipeline có tính idempotent — chạy lại cho cùng kết quả. (6) Dùng kiểm tra chất lượng dữ liệu sau mỗi giai đoạn.",
    },
    followUps: [
      {
        en: "What if the pipeline failure is caused by a bug in the transformation code and you need to fix it under time pressure?",
        vi: "Nếu lỗi do bug code biến đổi và bạn phải sửa dưới áp lực thời gian thì sao?",
      },
      {
        en: "How do you prevent the same pipeline failure from happening again?",
        vi: "Bạn ngăn cùng lỗi pipeline tái diễn thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Panics or suggests re-running without checking root cause",
        vi: "Hoảng loạn hoặc đề xuất chạy lại không kiểm tra nguyên nhân gốc",
      },
      {
        en: "Doesn't check logs systematically",
        vi: "Không kiểm tra log có hệ thống",
      },
      {
        en: "Has no recovery plan (backfill, idempotent design)",
        vi: "Không có kế hoạch phục hồi",
      },
    ],
  },
  {
    id: "scde-003",
    role: "SC Data Engineer",
    level: "Senior",
    type: "adaptation",
    topic: "Data Pipeline",
    question: {
      en: "Design a real-time supply chain event processing pipeline. You need to detect shipment delays as they happen and trigger alerts. What architecture and technologies would you use?",
      vi: "Thiết kế pipeline xử lý sự kiện chuỗi cung ứng real-time. Bạn cần phát hiện chậm trễ lô hàng ngay khi xảy ra và kích hoạt cảnh báo. Kiến trúc và công nghệ nào bạn dùng?",
    },
    businessContext: {
      en: "At FedEx or DHL, real-time shipment monitoring is a competitive differentiator for premium logistics services.",
      vi: "Tại FedEx hay DHL, giám sát lô hàng real-time là lợi thế cạnh tranh cho dịch vụ logistics cao cấp.",
    },
    dataAvailable: {
      en: "IoT sensor events (GPS location, temperature, shock), EDI 214 (shipment status messages), estimated delivery times, route plans, weather data APIs.",
      vi: "Sự kiện IoT (GPS, nhiệt độ, va đập), EDI 214 (trạng thái lô hàng), thời gian giao dự kiến, kế hoạch tuyến, dữ liệu thời tiết.",
    },
    expectedAnswer: {
      en: "I'd design a stream processing architecture: (1) Event ingestion via Kafka/Kinesis from IoT, EDI, and API sources. (2) Stream processing with Flink/Kafka Streams for real-time delay detection — compare current location vs expected location at time t. (3) Stateful processing to track each shipment's journey against plan. (4) Alert engine: if delay > threshold, trigger notifications via email/SMS/API. (5) Cold path: sink events to S3/data lake for batch analytics. (6) Monitoring: check stream lag, processing latency, error rates.",
      vi: "Tôi thiết kế kiến trúc xử lý luồng: (1) Tiếp nhận sự kiện qua Kafka/Kinesis. (2) Xử lý luồng với Flink/Kafka Streams để phát hiện chậm trễ — so sánh vị trí hiện tại vs dự kiến. (3) Xử lý có trạng thái theo dõi từng lô hàng. (4) Engine cảnh báo: nếu chậm > ngưỡng, kích hoạt thông báo. (5) Cold path: lưu sự kiện xuống S3/data lake. (6) Giám sát: độ trễ luồng, độ trễ xử lý, tỷ lệ lỗi.",
    },
    technicalPattern: {
      en: "Lambda architecture: speed layer (streaming) for real-time alerts + batch layer for accurate historical reporting. Streaming: Kafka → Flink → Alert Engine + Sink to Delta Lake. State: Flink keyed state per shipment_id with TTL for auto-cleanup. Tumbling windows for aggregating events. Exactly-once semantics for critical alerts.",
      vi: "Kiến trúc Lambda: lớp tốc độ (streaming) cho cảnh báo real-time + lớp batch cho báo cáo lịch sử chính xác. Streaming: Kafka → Flink → Alert Engine + Sink Delta Lake. State: Flink keyed state theo shipment_id với TTL. Cửa sổ tumbling để tổng hợp sự kiện. Ngữ nghĩa exactly-once cho cảnh báo quan trọng.",
    },
    followUps: [
      {
        en: "How do you handle late-arriving events in a streaming pipeline?",
        vi: "Bạn xử lý sự kiện đến muộn trong pipeline streaming thế nào?",
      },
      {
        en: "What's your strategy for testing a real-time pipeline before production deployment?",
        vi: "Chiến lược test pipeline real-time trước khi deploy production là gì?",
      },
    ],
    weakSignals: [
      {
        en: "Uses batch processing mindset for real-time requirements",
        vi: "Dùng tư duy batch cho yêu cầu real-time",
      },
      {
        en: "Cannot name specific streaming technologies or explain their roles",
        vi: "Không kể tên công nghệ streaming cụ thể hoặc giải thích vai trò",
      },
      {
        en: "Ignores state management and exactly-once semantics",
        vi: "Bỏ qua quản lý trạng thái và exactly-once semantics",
      },
    ],
  },
  {
    id: "erp-001",
    role: "SC Systems/ERP BA",
    level: "Fresher",
    type: "theory",
    topic: "ERP Systems",
    question: {
      en: "What is the role of an ERP system in supply chain management? Name the key modules relevant to supply chain.",
      vi: "Vai trò của hệ thống ERP trong quản lý chuỗi cung ứng là gì? Kể tên các module chính liên quan đến chuỗi cung ứng.",
    },
    businessContext: {
      en: "At CyberLogitec or VN Post, ERP systems are the backbone of supply chain operations, integrating planning, execution, and finance.",
      vi: "Tại CyberLogitec hay VN Post, ERP là xương sống của vận hành chuỗi cung ứng, tích hợp hoạch định, thực thi và tài chính.",
    },
    dataAvailable: {
      en: "No specific data — this is a conceptual question about ERP role in SCM.",
      vi: "Không có dữ liệu cụ thể — câu hỏi khái niệm về vai trò ERP trong SCM.",
    },
    expectedAnswer: {
      en: "ERP integrates all supply chain functions in one system: (1) Inventory Management — real-time stock visibility. (2) Procurement — PO management, supplier management. (3) Order Management — order-to-cash. (4) Warehouse Management — receiving, putaway, picking, shipping. (5) Manufacturing — production planning, BOM, routing. (6) Logistics — transportation management. (7) Finance — costing, AP/AR integrated with logistics. The key benefit is a single source of truth across the supply chain.",
      vi: "ERP tích hợp tất cả chức năng chuỗi cung ứng trong một hệ thống: (1) Quản lý tồn kho — hiển thị tồn kho real-time. (2) Mua hàng — quản lý PO, nhà cung cấp. (3) Quản lý đơn hàng — order-to-cash. (4) Quản lý kho — nhập, cất, lấy, giao. (5) Sản xuất — hoạch định sản xuất, BOM, quy trình. (6) Logistics — quản lý vận tải. (7) Tài chính — tính giá, AP/AR tích hợp logistics. Lợi ích chính là một nguồn sự thật duy nhất.",
    },
    technicalPattern: {
      en: "ERP modules are tightly integrated — a sales order in Order Management triggers inventory reservation, creates delivery, generates invoice. Understanding these integration points is key for an ERP BA. Common ERP platforms: SAP S/4HANA, Oracle EBS, Microsoft Dynamics 365, Odoo.",
      vi: "Module ERP tích hợp chặt chẽ — đơn bán hàng kích hoạt đặt trước tồn kho, tạo giao hàng, tạo hóa đơn. Hiểu điểm tích hợp này là chìa khóa cho ERP BA. Nền tảng ERP phổ biến: SAP S/4HANA, Oracle EBS, Microsoft Dynamics 365, Odoo.",
    },
    followUps: [
      {
        en: "How is an ERP system different from a dedicated WMS or TMS?",
        vi: "ERP khác hệ thống WMS hay TMS chuyên dụng thế nào?",
      },
      {
        en: "What challenges arise when implementing an ERP for supply chain?",
        vi: "Thách thức nào phát sinh khi triển khai ERP cho chuỗi cung ứng?",
      },
    ],
    weakSignals: [
      {
        en: "Cannot name specific SCM-related ERP modules",
        vi: "Không kể tên module ERP liên quan SCM cụ thể",
      },
      {
        en: "Describes ERP as just a database, not an integrated system",
        vi: "Mô tả ERP chỉ là cơ sở dữ liệu, không phải hệ thống tích hợp",
      },
      {
        en: "Doesn't understand integration between modules",
        vi: "Không hiểu tích hợp giữa các module",
      },
    ],
  },
  {
    id: "erp-002",
    role: "SC Systems/ERP BA",
    level: "Junior",
    type: "application",
    topic: "ERP Systems",
    question: {
      en: "You're configuring a new warehouse module in the ERP. The business wants to track inventory by lot number, expiration date, and storage location. How would you design the configuration and master data setup?",
      vi: "Bạn đang cấu hình module kho mới trong ERP. Doanh nghiệp muốn theo dõi tồn kho theo số lô, hạn sử dụng, và vị trí lưu kho. Bạn thiết kế cấu hình và master data thế nào?",
    },
    businessContext: {
      en: "At Elmich or SharkNinja, lot tracking and expiration management is critical for FMCG/pharma supply chain compliance.",
      vi: "Tại Elmich hay SharkNinja, theo dõi lô và hạn sử dụng rất quan trọng cho tuân thủ chuỗi cung ứng FMCG/dược phẩm.",
    },
    dataAvailable: {
      en: "Warehouse layout diagram, product catalog with shelf life data, current inventory tracking requirements, business process flows for receiving and shipping.",
      vi: "Sơ đồ kho, danh mục sản phẩm với hạn sử dụng, yêu cầu theo dõi tồn kho hiện tại, quy trình nhập và xuất.",
    },
    expectedAnswer: {
      en: "I'd configure: (1) Inventory parameters — enable lot control, shelf life management, and storage location tracking. (2) Master data: each product assigned to lot-controlled item group, shelf life days defined. (3) Warehouse structure: organization (Warehouse → Storage Area → Storage Section → Storage Bin). (4) Putaway strategy: by FIFO/FEFO based on expiration date. (5) Picking strategy: FEFO for expiration-sensitive products. (6) Reporting: lot traceability reports (upstream and downstream trace).",
      vi: "Tôi cấu hình: (1) Tham số tồn kho — bật kiểm soát lô, quản lý hạn sử dụng, theo dõi vị trí. (2) Master data: mỗi sản phẩm gán nhóm có kiểm soát lô, ngày hạn sử dụng. (3) Cấu trúc kho: tổ chức (Kho → Khu vực → Ô → Vị trí). (4) Chiến lược cất: theo FIFO/FEFO. (5) Chiến lược lấy: FEFO cho sản phẩy nhạy hạn. (6) Báo cáo: truy xuất nguồn gốc lô.",
    },
    technicalPattern: {
      en: "ERP warehouse config sequence: define warehouse structure → define storage types → define storage sections → define storage bins → configure putaway/picking strategies → assign to products. Key: test the flow with sample data before going live. Integration points: Inventory → Sales (ATP check), Purchasing (lot creation at GR), Manufacturing (lot consumption).",
      vi: "Trình tự cấu hình kho ERP: định nghĩa cấu trúc kho → loại lưu trữ → khu vực → vị trí → chiến lược cất/lấy → gán cho sản phẩm. Quan trọng: test với dữ liệu mẫu trước khi go-live. Điểm tích hợp: Tồn kho → Bán hàng (kiểm tra ATP), Mua hàng (tạo lô khi nhập), Sản xuất (tiêu thụ lô).",
    },
    followUps: [
      {
        en: "How would you handle expired inventory in the system? Should it be blocked from picking automatically?",
        vi: "Bạn xử lý tồn kho hết hạn trong hệ thống thế nào? Có nên tự động chặn lấy hàng?",
      },
      {
        en: "What if the warehouse team wants to override the FEFO picking strategy for a specific customer?",
        vi: "Nếu đội kho muốn ghi đè chiến lược lấy FEFO cho khách hàng cụ thể thì sao?",
      },
    ],
    weakSignals: [
      {
        en: "Configures without testing the end-to-end process",
        vi: "Cấu hình không test quy trình end-to-end",
      },
      {
        en: "Misses the integration between warehouse module and other modules",
        vi: "Bỏ qua tích hợp giữa module kho và module khác",
      },
      {
        en: "Doesn't understand FEFO vs FIFO or when to use each",
        vi: "Không hiểu FEFO vs FIFO hoặc khi nào dùng",
      },
    ],
  },
  {
    id: "erp-003",
    role: "SC Systems/ERP BA",
    level: "Senior",
    type: "adaptation",
    topic: "ERP Systems",
    question: {
      en: "Your company is planning to migrate from a legacy ERP to SAP S/4HANA. The current system has 15 years of customizations and the business doesn't want to change its processes. How do you approach this?",
      vi: "Công ty bạn đang lên kế hoạch chuyển từ ERP cũ sang SAP S/4HANA. Hệ thống hiện tại có 15 năm tùy chỉnh và doanh nghiệp không muốn thay đổi quy trình. Bạn tiếp cận thế nào?",
    },
    businessContext: {
      en: "At Maersk or CyberLogitec, ERP migrations are multi-year projects with high risk of business disruption.",
      vi: "Tại Maersk hay CyberLogitec, di chuyển ERP là dự án nhiều năm với rủi ro gián đoạn kinh doanh cao.",
    },
    dataAvailable: {
      en: "Current ERP system documentation, customization inventory, process flows, interfaces to external systems, data volume estimates, S/4HANA best practices library.",
      vi: "Tài liệu hệ thống ERP hiện tại, kiểm kê tùy chỉnh, sơ đồ quy trình, giao diện hệ thống bên ngoài, ước tính khối lượng dữ liệu, thư viện best practices S/4HANA.",
    },
    expectedAnswer: {
      en: "I'd recommend a 'clean core' approach with these steps: (1) Inventory all current customizations and classify them: must-have (core business), nice-to-have, obsolete. (2) Map each must-have to S/4HANA standard functionality first — 60-70% of customizations are often covered by standard. (3) Only build extensions for true gaps, using SAP's extension framework (BTP, key user extensibility). (4) Run a proof-of-concept for critical processes with business stakeholders. (5) Manage expectations: some process adaptation is inevitable — show the TCO of keeping old customizations vs adopting standard.",
      vi: "Tôi khuyến nghị cách tiếp cận 'clean core': (1) Kiểm kê tất cả tùy chỉnh hiện tại và phân loại: bắt buộc, nên có, lỗi thời. (2) Ánh xạ từng tùy chỉnh bắt buộc sang chức năng chuẩn S/4HANA — 60-70% thường được chuẩn hỗ trợ. (3) Chỉ xây dựng mở rộng cho khoảng trống thực sự, dùng extension framework của SAP. (4) Chạy proof-of-concept cho quy trình quan trọng với stakeholder. (5) Quản lý kỳ vọng: một số thích ứng quy trình là không thể tránh — cho thấy TCO giữ tùy chỉnh cũ vs áp dụng chuẩn.",
    },
    technicalPattern: {
      en: "ERP migration approach: System Conversion (brownfield) vs New Implementation (greenfield). Greenfield recommended for '15 years of customizations' case — clean start with S/4HANA best practices. Data migration: extract → cleanse → transform → load (ETL) with reconciliation at each step. Cutover strategy: big bang vs phased by module/business unit. Testing: unit → integration → UAT → parallel run.",
      vi: "Phương pháp di chuyển ERP: System Conversion (brownfield) vs New Implementation (greenfield). Greenfield khuyến nghị cho '15 năm tùy chỉnh' — khởi đầu sạch với best practices S/4HANA. Di chuyển dữ liệu: trích xuất → làm sạch → biến đổi → tải với đối chiếu mỗi bước. Chiến lược cutover: big bang vs theo module/đơn vị. Kiểm thử: đơn vị → tích hợp → UAT → song song.",
    },
    followUps: [
      {
        en: "What's your strategy for managing user adoption during an ERP migration?",
        vi: "Chiến lược quản lý áp dụng người dùng trong quá trình di chuyển ERP của bạn là gì?",
      },
      {
        en: "How do you ensure data quality in the migrated system?",
        vi: "Bạn đảm bảo chất lượng dữ liệu trong hệ thống đã di chuyển thế nào?",
      },
    ],
    weakSignals: [
      {
        en: "Proposes re-implementing every customization without evaluation",
        vi: "Đề xuất tái tạo mọi tùy chỉnh không đánh giá",
      },
      {
        en: "Doesn't know the difference between brownfield and greenfield",
        vi: "Không biết khác nhau giữa brownfield và greenfield",
      },
      {
        en: "Ignores change management and user adoption",
        vi: "Bỏ qua quản lý thay đổi và áp dụng người dùng",
      },
    ],
  },
];
