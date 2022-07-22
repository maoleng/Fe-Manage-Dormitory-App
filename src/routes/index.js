import Home from '~/pages/site/Home';
import Activity from '~/pages/site/Activity';
import Guide from '~/pages/site/Guide';
import News from '~/pages/site/News';
import Notification from '~/pages/site/Notification';
import Rules from '~/pages/site/Rules';
import Login from '~/pages/site/Login';
import MngRegisterForm from '~/pages/manage/RegisterForm';
import MngContract from '~/pages/manage/Contract';
import MngMistake from '~/pages/manage/Mistake';
import MngForm from '~/pages/manage/Form';
import MngPost from '~/pages/manage/Post';
import MngPostCreate from '~/pages/manage/PostCreate';
import MngPostUpdate from '~/pages/manage/PostUpdate';
import StdContract from '~/pages/student/Contract';
import StdMistake from '~/pages/student/Mistake';
import StdForm from '~/pages/student/Form';
import Test from '~/pages/Test';

export const routes = [
  { 
    'path': '/',
    'Component': Home
  },
  { 
    'path': '/hoat-dong',
    'Component': Activity
  },
  { 
    'path': '/huong-dan',
    'Component': Guide
  },
  { 
    'path': '/tin-tuc',
    'Component': News
  },
  { 
    'path': '/thong-bao',
    'Component': Notification
  },
  { 
    'path': '/noi-quy',
    'Component': Rules
  },
  { 
    'path': '/dang-nhap',
    'Component': Login
  },
  { 
    'path': '/quan-ly/don-dang-ky',
    'Component': MngRegisterForm
  },
  { 
    'path': '/quan-ly/hop-dong',
    'Component': MngContract
  },
  { 
    'path': '/quan-ly/vi-pham',
    'Component': MngMistake
  },
  { 
    'path': '/quan-ly/don-khieu-nai',
    'Component': MngForm
  },
  { 
    'path': '/quan-ly/bai-dang',
    'Component': MngPost
  },
  { 
    'path': '/quan-ly/bai-dang/tao-them',
    'Component': MngPostCreate
  },
  { 
    'path': '/quan-ly/bai-dang/chinh-sua/:id',
    'Component': MngPostUpdate
  },
  { 
    'path': '/sinh-vien/hop-dong',
    'Component': StdContract
  },
  { 
    'path': '/sinh-vien/vi-pham',
    'Component': StdMistake
  },
  { 
    'path': '/sinh-vien/don-khieu-nai',
    'Component': StdForm
  },
  { 
    'path': '/test',
    'Component': Test
  }
]