import Home from '~/pages/site/Home';
import Login from '~/pages/site/Login';
import MngRegisterForm from '~/pages/manage/RegisterForm';
import MngContract from '~/pages/manage/Contract';
import MngMistake from '~/pages/manage/Mistake';
import StdContract from '~/pages/student/Contract';
import Test from '~/pages/Test';

export const routes = [
  { 
    'path': '/',
    'Component': Home
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
    'path': '/sinh-vien/hop-dong',
    'Component': StdContract
  },
  { 
    'path': '/test',
    'Component': Test
  }
]