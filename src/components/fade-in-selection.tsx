import { motion } from "framer-motion";
export const FadeInSelection = ({ children }: { children: React.ReactNode }) => {
    return(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{opacity: 1, y: 0 }}
        transition={{
            delay: 0.8
        }}
        >
            {children}
        </motion.div>
    )
}