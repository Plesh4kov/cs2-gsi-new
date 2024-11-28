import { useRouter } from "next/router";

export default function PlayerCamera() {
    const router = useRouter();
    const { name } = router.query;

    // Генерируем ссылку для VDO.Ninja
    const cameraURL = `https://vdo.ninja/?view=${name}`;

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
            <iframe
                src={cameraURL}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="camera; microphone"
            />
        </div>
    );
}
