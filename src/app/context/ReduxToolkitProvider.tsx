'use client'
import { PersistGate } from "redux-persist/integration/react";
import store, { persister } from "../../store/store";
import { Provider} from "react-redux";
import { Fragment } from "react";

export function ReduxProvider({children}:{children:React.ReactNode}){
    return(
    <Fragment>
<Provider store={store}>
<PersistGate loading={null} persistor={persister}>
    {children}
</PersistGate>

</Provider>
</Fragment>)
}