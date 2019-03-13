import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { cleanup} from 'react-testing-library'

beforeEach(() => {
  jest.resetAllMocks()
})
afterEach(cleanup)

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock