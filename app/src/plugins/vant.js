import Vue from 'vue'
import { Button ,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    PullRefresh ,
    Toast,
    Search,
    Icon ,
    NavBar,
    Tag,
    Dialog,
    Grid,
    GridItem ,
    CountDown ,
    Checkbox,
    CheckboxGroup,
    Card,
    Stepper ,
    Cell,
    CellGroup,
    GoodsAction, GoodsActionIcon, GoodsActionButton,
    SubmitBar,
    Divider,
    Image,
    Form ,
    Field,
    Radio,
    RadioGroup,
    AddressList,
    AddressEdit ,
    Popup,
    DropdownMenu, DropdownItem,
    Lazyload,
    Overlay
} from 'vant'


Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(PullRefresh)
Vue.use(Search)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(CountDown )
Vue.use(Checkbox)
Vue.use(Card)
Vue.use(Stepper )

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(CheckboxGroup)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(SubmitBar)
Vue.use(Divider)
Vue.use(Image)

Vue.use(Form)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(AddressList)
Vue.use(AddressEdit )

Vue.use(Popup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Overlay)
Vue.use(Image)
Vue.use(Image)
Vue.use(Image)
Vue.use(Image)
Vue.use(Image)

Vue.use(Image)
Vue.use(Lazyload, {
    lazyComponent: true
  });
Vue.prototype.Toast = Toast
Vue.prototype.Dialog = Dialog