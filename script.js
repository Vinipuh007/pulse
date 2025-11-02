// функционал для раздела "Вопросы"
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.closest('.faq-item').classList.toggle('open');
  });
});

// 3д модель через биб Three.js
(function init3D(){
  const canvas = document.getElementById('threeCanvas');
  if(!canvas) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);

  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(2.4, 1.6, 3.2);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  function resize(){
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize(); window.addEventListener('resize', resize);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 1.2);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(5,5,5); scene.add(dir);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({color:0x0e162b, roughness:.9, metalness:0})
  );
  plane.rotation.x = -Math.PI/2; plane.position.y = -0.8; scene.add(plane);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new THREE.GLTFLoader();
  loader.load(
    'https://images.cults3d.com/pJb_i8azyHv3-tkZI8ntddx5_UA=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/28304104/illustration-file/e1ba26f9-dd99-4929-a36f-11a3af6cee24/ae522885-c5e9-451f-823e-5fb22f614e14.png',
    gltf=>{
      const root = gltf.scene;
      root.traverse(obj=>{
        if(obj.isMesh){ obj.castShadow=true; obj.receiveShadow=true; }
      });
      root.position.set(0,-0.8,0);
      scene.add(root);
    },
    undefined,
    err=>{
      // Fallback: animierter TorusKnoten, falls kein Modell vorhanden ist
      const geo = new THREE.TorusKnotGeometry(0.6, 0.2, 160, 24);
      const mat = new THREE.MeshStandardMaterial({color:0x45c5ff, metalness:.3, roughness:.2});
      const knot = new THREE.Mesh(geo, mat);
      scene.add(knot);
      (function spin(){
        knot.rotation.x += 0.01; knot.rotation.y += 0.013;
        requestAnimationFrame(spin);
      })();
    }
  );

  (function animate(){
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
})();
