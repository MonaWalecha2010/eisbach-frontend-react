import { SignUp } from "@clerk/nextjs"
import styles from '../../../styles/styles.module.scss' 
export default function Page() {
    return (
        <div className='relative w-full flex justify-center mx-auto py-[4rem]'>
            <div className={`w-full h-full absolute top-0 left-0  block md:hidden ${styles.authBg} ${styles.bgCenter}`} style={{backgroundImage:'url(/images/javelin_flying_upwards_with_speed.png)'}}>
                <h2 className="absolute bottom-1 right-3 text-xl text-white font-bold">Javelin</h2>
            </div>  
            <SignUp 
                appearance={{
                    elements:{
                      card:{
                        backgroundColor: 'rgba(255,255,255, 0.8)',                  
                      }
                    }
                }}
            />
        </div>
    );
}
