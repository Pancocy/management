import { 
AppstoreOutlined,
TeamOutlined, 
SafetyOutlined,
PieChartOutlined ,
HomeOutlined,
PoundCircleOutlined,
AreaChartOutlined,
BarChartOutlined,
LineChartOutlined,
FormOutlined 
} from '@ant-design/icons';
const menuList = [
    {
        label: '首页', // 菜单标题名称
        key: '/', // 对应的path
        icon: <HomeOutlined />, // 图标名称
    },
    {
        label: '商品',
        key: '/products',
        icon: <AppstoreOutlined />,
        children: [ // 子菜单列表
            {
                label: '品类管理',
                key: '/category',
                icon: <PieChartOutlined />
            },
            {
                label: '商品管理',
                key: '/product',
                icon: <PoundCircleOutlined />
            },
        ]
    },

    {
        label: '用户管理',
        key: '/user',
        icon: <TeamOutlined />
    },
    {
        label: '角色管理',
        key: '/role',
        icon: <SafetyOutlined />,
    },

    {
        label: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                label: '柱形图',
                key: '/charts/bar',
                icon: <PieChartOutlined />
            },
            {
                label: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined />
            },
            {
                label: '饼图',
                key: '/charts/pie',
                icon: <BarChartOutlined />
            },
        ]
    },

    {
        label: '订单管理',
        key: '/order',
        icon: <FormOutlined />,
    },
]

export default menuList