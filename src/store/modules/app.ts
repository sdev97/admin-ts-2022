import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setLanguage } from '@/utils/cookies'
import { getLocale } from '@/lang'
import store from '@/store'


export interface IAppState {
  language: string
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public language = getLocale()

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
    setLanguage(this.language)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

}

export const AppModule = getModule(App)
